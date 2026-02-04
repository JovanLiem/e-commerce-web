import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

const createTables = async () => {
    // Users table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

    // Products table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price NUMERIC(12, 2) NOT NULL,
      category VARCHAR(100) NOT NULL,
      image TEXT NOT NULL,
      stock INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

    // Carts table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS carts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

    // Cart items table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id SERIAL PRIMARY KEY,
      cart_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      UNIQUE(cart_id, product_id)
    );
  `);

    // Seed products
    await pool.query(`
    INSERT INTO products (name, description, price, category, image, stock)
    VALUES
      ('Nasi Goreng Spesial', 'Nasi goreng dengan bumbu rahasia dan telur', 25000, 'Makanan', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', 50),
      ('Mie Ayam Bakso', 'Mie ayam dengan bakso sapi premium', 18000, 'Makanan', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', 40),
      ('Es Teh Manis', 'Es teh manis segar dan dingin', 8000, 'Minuman', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400', 100),
      ('Jus Alpukat', 'Jus alpukat segar tanpa pengawet', 12000, 'Minuman', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400', 60),
      ('Headphone Wireless', 'Headphone bluetooth berkualitas tinggi', 350000, 'Elektronik', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 20),
      ('Charger USB-C', 'Charger cepat 65W USB-C', 120000, 'Elektronik', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', 30),
      ('Kaos Polos', 'Kaos polos katun berkualitas', 75000, 'Fashion', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 100),
      ('Jaket Denim', 'Jaket denim kasual stylish', 450000, 'Fashion', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', 15),
      ('Notebook Premium', 'Buku catatan kulit asli A5', 45000, 'Lainnya', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', 80),
      ('Pulpen Mewah', 'Pulpen premium metal body', 65000, 'Lainnya', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', 60)
    ON CONFLICT DO NOTHING;
  `);

    console.log("✅ Tables dan seed data berhasil dibuat!");
};

const main = async () => {
    try {
        await createTables();
        await pool.end();
    } catch (error) {
        console.error("❌ Error creating tables:", error);
        await pool.end();
        process.exit(1);
    }
};

main();