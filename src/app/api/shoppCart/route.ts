import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { infoMessages } from "@/data/responseMessages"

export async function GET() {
    try {
        const [rows] = await db.query(
            "SELECT * FROM shoppCart JOIN products WHERE product_id = products.id"
        )
        return NextResponse.json(rows)
    } catch (error) {
        console.error("Erreur MySQL :", error)
        return NextResponse.json({ error: infoMessages.server }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { product_id } = body

        if (!product_id) {
            return NextResponse.json({ error: "ID produit manquant" }, { status: 400 })
        }

        const [rows] = await db.query(
            "SELECT * FROM shoppCart WHERE product_id = ?",
            [product_id]
        )

        if ((rows as any[]).length > 0) {
            await db.query(
                "UPDATE shoppCart SET quantity = quantity + 1 WHERE product_id = ?",
                [product_id]
            )
        } else {
            await db.query(
                "INSERT INTO shoppCart (product_id, quantity) VALUES (?, ?)",
                [product_id, 1]
            )
        }

        return NextResponse.json({ message: "Article ajouté au panier" })
    } catch (error) {
        console.error("Erreur MySQL :", error)
        return NextResponse.json({ error: infoMessages.server }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const { product_id, action } = body

        if (!product_id || !["increment", "decrement"].includes(action)) {
            return NextResponse.json({ error: "Requête invalide" }, { status: 400 })
        }

        if (action === "increment") {
            await db.query(
                "UPDATE shoppCart SET quantity = quantity + 1 WHERE product_id = ?",
                [product_id]
            )
        } else if (action === "decrement") {
            const [result] = await db.query(
                "SELECT quantity FROM shoppCart WHERE product_id = ?",
                [product_id]
            ) as unknown as [{ quantity: number }[]];

            const currentQuantity = result[0]?.quantity || 0

            if (currentQuantity > 1) {
                await db.query(
                    "UPDATE shoppCart SET quantity = quantity - 1 WHERE product_id = ?",
                    [product_id]
                )
            } else {
                await db.query(
                    "DELETE FROM shoppCart WHERE product_id = ?",
                    [product_id]
                )
            }
        }

        return NextResponse.json({ message: "Quantité mise à jour" })
    } catch (error) {
        console.error("Erreur MySQL :", error)
        return NextResponse.json({ error: infoMessages.server }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json()
        const { product_id } = body

        if (!product_id) {
            return NextResponse.json({ error: "ID produit manquant" }, { status: 400 })
        }

        await db.query("DELETE FROM shoppCart WHERE product_id = ?", [product_id])

        return NextResponse.json({ message: "Article supprimé du panier" })
    } catch (error) {
        console.error("Erreur MySQL :", error)
        return NextResponse.json({ error: infoMessages.server }, { status: 500 })
    }
}