import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/database";
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email dan password harus diisi" }, { status: 400 });
        }

        // Cari user berdasarkan email
        const result = await query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (!user) {
            return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
        }

        // Bandingkan password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
        }

        const token = generateToken(user.id.toString());

        return NextResponse.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}