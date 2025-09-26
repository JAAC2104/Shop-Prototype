import { useCart } from "../contexts/CartContext"
import PlusIcon from "../assets/plus.svg?react"
import MinusIcon from "../assets/minus.svg?react"
import TrashIcon from "../assets/trash3.svg?react"
import { NavLink } from "react-router-dom";

export default function ShoppingCartPage(){
    const { cartItems, totalPrice, deleteCartItem, emptyShoppingCart, incrementItem, decrementItem } = useCart();

    return(
        <div>
            <h1 className="text-3xl m-20 lg:ms-80">Shopping Cart:</h1>
            <div className="productsContainer flex flex-col gap-3">
                {cartItems.length === 0 ? <div className="flex flex-col lg:flex-row bg-neutral-100 lg:w-3/8 w-5/6 mx-auto p-5 rounded-lg shadow-sm justify-center"><NavLink to="/" className="text-3xl hover:underline">Start Shopping</NavLink></div> : <>
                {cartItems.map(item => (

                    <div key={item.id} className="flex flex-col md:flex-col lg:flex-row bg-neutral-100 w-5/6 md:6/8 lg:w-4/6 mx-auto p-5 rounded-lg shadow-sm flex">
                        <div className="flex w-[200px] h-[200px] items-center mx-auto">
                            <img src={item.image} alt="Product" className="max-w-[150px] max-h-[150px] mx-auto" />
                        </div>
                        <div className="lg:flex m-5 lg:ms-20 w-full">
                            <div className="flex flex-col gap-5 lg:w-1/2">
                                <span className="text-xl">{item.name}</span>
                                <div className="flex items-center my-auto">
                                    <span>Quantity: </span>
                                    <button onClick={() => decrementItem(item.id, item.quantity)} className="cursor-pointer bg-amber-400 p-1 mx-4 rounded-full m-2 border-2 border-slate-800 hover:bg-amber-500 text-2xl"><MinusIcon className="h-7 w-7"/></button>
                                    <span className="text-lg">{item.quantity}</span>
                                    <button onClick={() => incrementItem(item)} className="cursor-pointer bg-amber-400 p-1 mx-4 rounded-full m-2 border-2 border-slate-800 hover:bg-amber-500 text-2xl"><PlusIcon className="h-7 w-7"/></button>
                                </div>
                            </div>
                            <div className="flex lg:w-1/2 items-center justify-around mt-5 lg:mt-10">
                                <span className="text-xl text-amber-500">${(item.price * item.quantity).toFixed(2)}</span>
                                <button onClick={() => deleteCartItem(item.id)} className="cursor-pointer bg-amber-400 p-1 rounded-full border-2 border-slate-800 hover:bg-amber-500 text-2xl"><TrashIcon className="h-7 w-7"/></button>
                            </div>
                        </div>
                    </div>
                ))}</>}
                {cartItems.length === 0 ? <></> : <button onClick={() => emptyShoppingCart()} className="cursor-pointer hover:underline">Empty Shopping Cart</button>}
            </div>
            <div className="flex w-5/6 lg:w-3/8 mx-auto m-10 justify-between items-center lg:px-20">
                <span className="text-2xl">Total: <span className="text-amber-500">{totalPrice.toFixed(2)}</span></span>
                {cartItems.length === 0 ? <></> : <button className="cursor-pointer bg-amber-400 p-2 rounded-md border-2 border-slate-800 hover:bg-amber-500">Purchase</button>}
            </div>
        </div>
    )
}