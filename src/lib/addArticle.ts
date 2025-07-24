import { infoMessages } from "@/data/responseMessages"
import { apiRoutes } from "../data/ROUTES"

export async function addToCart(product_id: number) {
    const res = await fetch(apiRoutes.CART, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id }),
    });
    if (!res.ok) throw new Error(infoMessages.error);
    return res.json();
}