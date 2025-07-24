import { infoMessages } from "@/data/responseMessages"
import { apiRoutes } from "../data/ROUTES"

export async function getProduct(id:number) {
    const res = await fetch(`${apiRoutes.PRODUCTS}/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    if (!res.ok) throw new Error(infoMessages.error)
    return res.json()
}
