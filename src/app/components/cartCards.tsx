"use client";

import { useEffect, useState } from "react"
import { displayCart, updateMoreArticle, updateLessArticle, deleteFromCart } from "@/service/rollsService"
import styles from "./cartCards.module.css"

type CartItem = {
    product_id: number
    image_url: string
    name: string
    short_description: string
    price: number
    quantity: number
    localQuantity?: number
}

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    useEffect(() => {
        async function fetchCart() {
            const data = await displayCart()
            setCartItems(data)
        }
        fetchCart()
    }, [])

    const handleIncrement = async (item: any, index: number) => {
        if (item.quantity <= 1) {
            const updatedItems = [...cartItems]
            updatedItems[index].localQuantity = (updatedItems[index].localQuantity || 1) + 1
            setCartItems(updatedItems)
            updateMoreArticle(item.product_id)
        } else {
            await updateMoreArticle(item.product_id)
            refreshCart()
        }
    }

    const handleDecrement = async (item: any, index: number) => {
        if (item.quantity <= 1) {
            const updatedItems = [...cartItems]
            const current = updatedItems[index].localQuantity || 1
            updatedItems[index].localQuantity = current > 1 ? current - 1 : 1
            setCartItems(updatedItems)
        } else {
            await updateLessArticle(item.product_id)
            refreshCart()
        }
    }

    const refreshCart = async () => {
        const data = await displayCart()
        setCartItems(data)
    }

    const totalPrice = cartItems.reduce((total, item) => {
        const quantity = item.quantity > 1 ? item.quantity : (item.localQuantity || 1)
        return total + item.price * quantity
    }, 0)

    return (
        <ul className={styles.cartList}>
            {cartItems.map((item, index) => {
                const isLocal = item.quantity <= 1
                const quantity = isLocal ? (item.localQuantity || 1) : item.quantity

                return (
                    <li key={item.product_id} className={styles.cartItem}>
                        <img
                            src={`/images/${item.image_url}`}
                            alt={item.name}
                            className={styles.cartImage}
                        />
                        <div className={styles.cartDetails}>
                            <h2>{item.name}</h2>
                            <p>{item.short_description}</p>
                            <p>{item.price} €</p>

                            <div className={styles.quantityWrapper}>
                                <button
                                    className={styles.quantityButton}
                                    onClick={() => handleDecrement(item, index)}
                                >
                                    -
                                </button>

                                <p>Quantité : {quantity}</p>

                                <button
                                    className={styles.quantityButton}
                                    onClick={() => handleIncrement(item, index)}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                className={styles.removeButton}
                                onClick={async () => {
                                    await deleteFromCart(item.product_id);
                                    refreshCart();
                                }}
                            >
                                Enlever l'article
                            </button>
                        </div>
                    </li>
                )
            })}
            <h4 className={styles.total}>Total: {totalPrice.toFixed(2)}€</h4>
        </ul>
    )
}
