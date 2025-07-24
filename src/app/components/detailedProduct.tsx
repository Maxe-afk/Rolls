"use client";

import { getOneProduct } from "@/service/rollsService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailedProduct() {
    const params = useParams()
    const id = Number(params.id)

    type Product = {
        id: number;
        name: string;
        long_description: string;
        price: number;
        image_url: string;
    };

    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        if (!isNaN(id)) {
            async function fetchProduct() {
                try {
                    const data = await getOneProduct(id)
                    setProduct(data)
                } catch (error) {
                    console.error("Erreur fetch produit :", error)
                }
            }

            fetchProduct()
        }
    }, [id])

    if (!product) return <p>Chargement...</p>

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.long_description}</p>
            <p>{product.price} €</p>
            <img src={`/images/${product.image_url}`} alt={product.name} />
        </div>
    )
}