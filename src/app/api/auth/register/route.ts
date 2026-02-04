import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/database";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
        }

        // Cek email sudah ada
        const checkEmail = await query("SELECT id FROM users WHERE email = $1", [email]);
        if (checkEmail.rows.length > 0) {
            return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
        }

        // Hash password dan insert user
        const hashedPassword = await hashPassword(password);
        const result = await query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
            [name, email, hashedPassword]
        );

        const user = result.rows[0];
        const token = generateToken(user.id.toString());

        return NextResponse.json({ token, user });
    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}