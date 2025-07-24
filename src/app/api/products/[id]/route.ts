import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { infoMessages } from "@/data/responseMessages"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id)

    try {
        const result: any = await db.query(
            "SELECT * FROM products WHERE id = ?",
            [id]
        )
        const rows = Array.isArray(result) ? result[0] : result.rows || [];
        return NextResponse.json(rows[0]) 
    } catch (error) {
        console.error("Erreur MySQL :", error)
        return NextResponse.json({ error: infoMessages.server }, { status: 500 })
    }
}
