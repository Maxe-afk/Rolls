import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { infoMessages } from "@/data/responseMessages"

export async function GET() {
    try {
        const [rows] = await db.query(
            "SELECT * FROM products ORDER BY id ASC"
        )
        return NextResponse.json(rows)
    } catch (error) {
        console.error("Erreur MySQL :", error)
        return NextResponse.json({ error: infoMessages.server }, { status: 500 })
    }
}