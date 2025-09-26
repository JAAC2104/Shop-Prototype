import Hero from "../components/Hero";
import StoreProducts from "../components/StoreProducts";


export default function MainPage(){

    return (<>
        <Hero/>
        <hr className="my-10 text-neutral-300 w-7/8 m-auto" />
        <StoreProducts/>
    </>)
}