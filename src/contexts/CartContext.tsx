// src/contexts/CartContext.tsx
import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  doc, getDoc, setDoc, deleteDoc, onSnapshot, collection, increment, getDocs
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

export type CartItem = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

type ShoppingCartValue = {
  cartItems: CartItem[];
  totalPrice: number;
  getTotalItems: number;
  addCartItem: (newItem: CartItem) => Promise<void>;
  deleteCartItem: (itemId: number) => Promise<void>;
  emptyShoppingCart: () => Promise<void>;
  incrementItem: (item: CartItem) => Promise<void>;
  decrementItem: (itemId: number, currentQty: number) => Promise<void>;
};

export const CartContext = createContext<ShoppingCartValue | undefined>(undefined);
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
};

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!currentUser) { setCartItems([]); return; }
    const colRef = collection(db, "users", currentUser.uid, "cart");
    const unsub = onSnapshot(colRef, (snap) => {
      const items = snap.docs.map(d => d.data() as CartItem);
      setCartItems(items);
    });
    return unsub;
  }, [currentUser]);

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const getTotalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const addCartItem = async (newItem: CartItem) => {
    if (!currentUser) throw new Error("You must be logged in to add items to cart");
    const ref = doc(db, "users", currentUser.uid, "cart", String(newItem.id));
    const snap = await getDoc(ref);

    if (snap.exists()) {
      await setDoc(ref, { quantity: increment(newItem.quantity) }, { merge: true });
    } else {
      await setDoc(ref, newItem);
    }
  };

  const deleteCartItem = async (itemId: number) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, "users", currentUser.uid, "cart", String(itemId)));
  };

  const emptyShoppingCart = async () => {
    if (!currentUser) return;
    const colRef = collection(db, "users", currentUser.uid, "cart");
    const snap = await getDocs(colRef);
    await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
  };

  const incrementItem = async (item: CartItem) => {
    if (!currentUser) return;
    const ref = doc(db, "users", currentUser.uid, "cart", String(item.id));
    await setDoc(ref, { quantity: increment(1) }, { merge: true });
  };

  const decrementItem = async (itemId: number, currentQty: number) => {
    if (!currentUser) return;
    const ref = doc(db, "users", currentUser.uid, "cart", String(itemId));
    if (currentQty <= 1) {
      await deleteDoc(ref);
    } else {
      await setDoc(ref, { quantity: increment(-1) }, { merge: true });
    }
  };

  const value: ShoppingCartValue = {
    cartItems,
    totalPrice,
    getTotalItems,
    addCartItem,
    deleteCartItem,
    emptyShoppingCart,
    incrementItem,
    decrementItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
