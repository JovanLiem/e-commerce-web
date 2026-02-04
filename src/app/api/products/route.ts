import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/database";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");

        let sql = "SELECT * FROM products ORDER BY created_at DESC";
        const params: any[] = [];

        if (category && category !== "Semua") {
            sql = "SELECT * FROM products WHERE category = $1 ORDER BY created_at DESC";
            params.push(category);
        }

        const result = await query(sql, params);
        return NextResponse.json({ products: result.rows });
    } catch (error) {
        console.error("Get products error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, description, price, category, image, stock } = await request.json();

        const result = await query(
            `INSERT INTO products (name, description, price, category, image, stock)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
            [name, description, price, category, image, stock]
        );

        return NextResponse.json({ product: result.rows[0] }, { status: 201 });
    } catch (error) {
        console.error("Create product error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}