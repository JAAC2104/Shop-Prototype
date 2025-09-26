import storeApi from "../api/axios";


export async function getProducts(limit: number){
    const res = await storeApi(`/products?limit=${limit}`)
    return res.data
}