import { useProducts } from "../hooks/useProducts"
import AddToCartBtn from "./AddToCartBtn";


export default function StoreProducts(){
    const { products, loading, error} = useProducts(20);

    if (loading) return <p>Loading Products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (<>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5 m-10">
            {products.map((product) => (
                <div key={product.id} className="p-2 rounded-lg transition duration-2s bg-neutral-100 lg:bg-white hover:bg-neutral-100 hover:scale-[1.05] hover:shadow-sm">
                    <div className="image h-[300px] items-center flex"><img className="max-h-[300px] m-auto" src={product.image} alt="Product Image" /></div>
                    <div className="card-info mt-5 flex flex-col gap-3 h-[80px]">
                        <span className="text-lg">{product.title}</span>
                        <span className="m-auto text-amber-500">${product.price}</span>
                    </div>
                    <div className="button flex m-2"><AddToCartBtn product={{ id: product.id, name: product.title, image: product.image ,price: product.price}}/></div>
                </div>
            ))}
        </div>
    </>)
}