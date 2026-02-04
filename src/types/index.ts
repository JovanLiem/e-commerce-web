export interface User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
    created_at: Date;
}

export interface CartItem {
    cart_item_id: number;
    product_id: number;
    quantity: number;
    name: string;
    price: number;
    image: string;
}

export interface Cart {
    items: CartItem[];
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

export interface ThemeContextType {
    theme: "light" | "dark";
    toggleTheme: () => void;
}