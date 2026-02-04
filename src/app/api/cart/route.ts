import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/database";
import { getUserFromToken } from "@/lib/auth";

// Helper extract userId dari token
function extractUserId(request: NextRequest): string | null {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
    const token = authHeader.substring(7);
    return getUserFromToken(token);
}

// Helper get/create cart & return items
async function getCartWithItems(userId: string) {
    // Cari cart, kalau belum ada buat baru
    let cart = await query("SELECT * FROM carts WHERE user_id = $1", [userId]);
    if (cart.rows.length === 0) {
        cart = await query("INSERT INTO carts (user_id) VALUES ($1) RETURNING *", [userId]);
    }

    const cartId = cart.rows[0].id;

    // Ambil cart items + join ke products untuk data lengkap
    const items = await query(
        `SELECT ci.id as cart_item_id, ci.product_id, ci.quantity,
            p.name, p.price, p.image
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.cart_id = $1`,
        [cartId]
    );

    return { cartId, items: items.rows };
}

// GET - Ambil semua item di cart
export async function GET(request: NextRequest) {
    try {
        const userId = extractUserId(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { items } = await getCartWithItems(userId);
        return NextResponse.json({ cart: { items } });
    } catch (error) {
        console.error("Get cart error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// POST - Tambah item ke cart
export async function POST(request: NextRequest) {
    try {
        const userId = extractUserId(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId, quantity } = await request.json();
        const { cartId } = await getCartWithItems(userId);

        // Cek apakah item sudah ada di cart
        const existing = await query(
            "SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2",
            [cartId, productId]
        );

        if (existing.rows.length > 0) {
            // Sudah ada → tambah quantity
            await query(
                "UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3",
                [quantity, cartId, productId]
            );
        } else {
            // Belum ada → insert baru
            await query(
                "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)",
                [cartId, productId, quantity]
            );
        }

        // Update timestamp cart
        await query("UPDATE carts SET updated_at = NOW() WHERE id = $1", [cartId]);

        const { items } = await getCartWithItems(userId);
        return NextResponse.json({ cart: { items } });
    } catch (error) {
        console.error("Add to cart error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// PUT - Update quantity
export async function PUT(request: NextRequest) {
    try {
        const userId = extractUserId(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId, quantity } = await request.json();
        const { cartId } = await getCartWithItems(userId);

        await query(
            "UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3",
            [quantity, cartId, productId]
        );

        await query("UPDATE carts SET updated_at = NOW() WHERE id = $1", [cartId]);

        const { items } = await getCartWithItems(userId);
        return NextResponse.json({ cart: { items } });
    } catch (error) {
        console.error("Update cart error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// DELETE - Hapus item dari cart
export async function DELETE(request: NextRequest) {
    try {
        const userId = extractUserId(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("productId");
        const { cartId } = await getCartWithItems(userId);

        await query(
            "DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2",
            [cartId, productId]
        );

        await query("UPDATE carts SET updated_at = NOW() WHERE id = $1", [cartId]);

        const { items } = await getCartWithItems(userId);
        return NextResponse.json({ cart: { items } });
    } catch (error) {
        console.error("Delete cart item error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}