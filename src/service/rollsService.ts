import { getProducts } from "@/lib/getProducts";
import { getCart } from "@/lib/getCart";
import { addToCart } from "@/lib/addArticle";
import { updateCartQuantity } from "@/lib/updateArticle";
import { removeFromCart } from "@/lib/deleteArticle";
import { getProduct } from "@/lib/getProduct";

export async function getAllProducts() {
    return getProducts()
}

export async function displayCart() {
    return getCart()
}

export async function addArticleToCart(id: number) {
    return addToCart(id)
}

export async function updateMoreArticle(id: number) {
    return updateCartQuantity(id, "increment")
}

export async function updateLessArticle(id: number) {
    return updateCartQuantity(id, "decrement")
}

export async function deleteFromCart(id: number) {
    return removeFromCart(id)
}

export async function getOneProduct(id: number) {
    return getProduct(id)
}