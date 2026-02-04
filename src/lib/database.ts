import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

pool.on("error", (err) => {
    console.error("❌ Unexpected error on idle client", err);
    process.exit(-1);
});

export async function getPool(): Promise<Pool> {
    return pool;
}

export async function query(text: string, params?: any[]) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("✅ Query executed", { text, duration: `${duration}ms`, rows: res.rowCount });
    return res;
}

export default pool;