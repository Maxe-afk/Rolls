"use client";

import { getAllProducts } from "@/service/rollsService";
import { useEffect, useState } from "react";
import styles from "./productCards.module.css"
import { addArticleToCart } from "@/service/rollsService";
import Link from "next/link";

export type Product = {
    id: number;
    name: string;
    image_url: string;
    short_description: string;
    price: number;
};

export default function ProductCards() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Erreur lors du fetch des produits :", error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <>
            <div className={styles.productContainer}>
            <div className={styles["product-list"]}>
                {products.slice(0, 6).map((product, index) => (
                    <div key={product.id} className={styles["product-card"]}>
                        <img
                            src={`/images/${product.image_url}`}
                            alt={product.name}
                            className={styles["product-image"]}
                        />
                        <div className={styles["product-description"]}>
                            <Link href={`/${product.id}`}><h2 className={styles["product-name"]}>{product.name}</h2></Link>
                            <p>{product.short_description}</p>
                            <p className={styles["product-price"]}>{product.price} €</p>
                            <button className={styles.addToCart} onClick={() => addArticleToCart(product.id)}>Ajouter au panier</button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}