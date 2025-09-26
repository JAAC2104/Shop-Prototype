import { useEffect, useState } from "react";
import { getProducts } from "../services/products";


export function useProducts(limit: number){
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProducts(limit)
            .then(setProducts)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [limit]);

    return { products, loading, error }
}