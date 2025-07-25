"use client";

import { addArticleToCart, getOneProduct } from "@/service/rollsService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./detailedProduct.module.css"

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
        <>
            <div className={styles.productContainer}>
                <div className={styles.productDescription}>
                    <h1 className={styles.productName}>{product.name}</h1>
                    <p className={styles.productDescription}>{product.long_description}</p>
                    <p className={styles.productPrice}>{product.price} €</p>
                    <button className={styles.addToCart} onClick={() => addArticleToCart(product.id)}>Ajouter au panier</button>
                </div>
                <div className={styles.imageContainer}>
                    <img src={`/images/${product.image_url}`} alt={product.name} className={styles.productImage} />
                </div>
            </div>
        </>
    )
}