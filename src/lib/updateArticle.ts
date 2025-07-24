import { infoMessages } from "@/data/responseMessages"
import { apiRoutes } from "../data/ROUTES"

export async function updateCartQuantity(product_id: number, action: "increment" | "decrement") {
    const res = await fetch(apiRoutes.CART, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id, action }),
    });
    if (!res.ok) throw new Error(infoMessages.error);
    return res.json();
}