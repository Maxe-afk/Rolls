import { infoMessages } from "@/data/responseMessages"
import { apiRoutes } from "../data/ROUTES"

export async function getProducts() {
    const res = await fetch(apiRoutes.PRODUCTS, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    if (!res.ok) throw new Error(infoMessages.error)
    return res.json()
}
