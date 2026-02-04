import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/database";
import { getUserFromToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.substring(7);
        const userId = getUserFromToken(token);

        if (!userId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const result = await query(
            "SELECT id, name, email, created_at FROM users WHERE id = $1",
            [userId]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user: result.rows[0] });
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}