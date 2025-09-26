// src/components/AddToCartBtn.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

type Props = {
  product: { id: number; name: string; image: string; price: number };
  qty?: number;
};

export default function AddToCartBtn({ product, qty = 1 }: Props) {
  const { addCartItem } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleClick() {

    if(!currentUser){
      navigate("/log-in", {replace: true})
    } else {
      await addCartItem({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: qty,
      });
    }
  }

  return (
    <button
      onClick={handleClick}
      className="mt-10 mx-auto border-2 border-slate-800 w-[120px] h-[40px] rounded-md text-md bg-amber-400 hover:bg-amber-500 cursor-pointer"
    >
      Add to Cart
    </button>
  );
}
