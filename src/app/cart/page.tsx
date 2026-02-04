'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
    Container,
    Title,
    Text,
    Button,
    Card,
    Stack,
    Group,
    Loader,
} from '@mantine/core';
import { IconBrandWhatsapp } from '@tabler/icons-react';

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
        return cart.items.reduce(
            (sum, item) => sum + Number(item.price) * item.quantity,
            0
        );
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
            <Container size="md" py="xl">
                <Group justify="center">
                    <Loader />
                </Group>
            </Container>
        );
    }

    return (
        <Container size="md" py="xl">
            <Title order={1} mb="lg">
                Keranjang Belanja
            </Title>

            {!cart || cart.items.length === 0 ? (
                <Card withBorder shadow="md" padding="xl" radius="md">
                    <Stack align="center">
                        <Text c="dimmed">Keranjang Anda masih kosong</Text>
                        <Button onClick={() => router.push('/products')}>
                            Mulai Belanja
                        </Button>
                    </Stack>
                </Card>
            ) : (
                <Stack gap="md">
                    {cart.items.map((item) => (
                        <CartItemComponent
                            key={item.product_id}
                            item={item}
                            onUpdate={fetchCart}
                        />
                    ))}

                    <Card withBorder shadow="md" padding="lg" radius="md">
                        <Group justify="space-between" mb="md">
                            <Text fw={600} size="lg">
                                Total
                            </Text>
                            <Text fw={700} size="xl" c="blue">
                                Rp {calculateTotal().toLocaleString('id-ID')}
                            </Text>
                        </Group>

                        <Button
                            color="green"
                            size="lg"
                            fullWidth
                            leftSection={<IconBrandWhatsapp size={20} />}
                            onClick={handleCheckout}
                        >
                            Pesan via WhatsApp
                        </Button>
                    </Card>
                </Stack>
            )}
        </Container>
    );
}
