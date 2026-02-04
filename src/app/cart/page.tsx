'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CartItemComponent from '@/components/CardItem';
import { useAuth } from '@/context/AuthContext';
import { Cart } from '@/types';

export default function CartPage() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        fetchCart();
    }, [user]);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('/api/cart', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart(data.cart);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        if (!cart) return 0;
        return cart.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    };

    const handleCheckout = async () => {
        if (!cart || cart.items.length === 0) {
            alert('Keranjang kosong!');
            return;
        }

        try {
            const { data } = await axios.post('/api/whatsapp', {
                items: cart.items,
                total: calculateTotal(),
                userName: user?.name || 'Customer',
            });

            window.open(data.url, '_blank');

            // Hapus semua item dari cart setelah checkout
            const token = localStorage.getItem('token');
            for (const item of cart.items) {
                await axios.delete(`/api/cart?productId=${item.product_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            alert('Pesanan berhasil dikirim ke WhatsApp!');
            fetchCart();
        } catch (error) {
            alert('Gagal membuat pesanan');
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Keranjang Belanja
            </h1>

            {!cart || cart.items.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Keranjang Anda masih kosong
                    </p>
                    <button
                        onClick={() => router.push('/products')}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg"
                    >
                        Mulai Belanja
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {cart.items.map((item) => (
                        <CartItemComponent key={item.product_id} item={item} onUpdate={fetchCart} />
                    ))}

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-semibold text-gray-900 dark:text-white">
                                Total:
                            </span>
                            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                Rp {calculateTotal().toLocaleString('id-ID')}
                            </span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-lg"
                        >
                            <span>💬</span>
                            Pesan via WhatsApp
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}