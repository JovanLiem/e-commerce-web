'use client';

import { Product } from '@/types';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, Image, Text, Badge, Button, Group, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconShoppingCartPlus, IconCheck } from '@tabler/icons-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const addToCart = async () => {
        if (!user) {
            notifications.show({
                title: 'Login Required',
                message: 'Silakan login terlebih dahulu',
                color: 'red',
            });
            router.push('/login');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                '/api/cart',
                {
                    productId: product.id,
                    quantity: 1,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            notifications.show({
                title: 'Berhasil',
                message: 'Produk ditambahkan ke keranjang',
                color: 'green',
                icon: <IconCheck size={18} />,
            });
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Gagal menambahkan ke keranjang',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image src={product.image} height={200} alt={product.name} fit="cover" />
            </Card.Section>

            <Stack mt="md" gap="xs">
                <Group justify="space-between" align="flex-start">
                    <Text fw={600} size="lg" lineClamp={1}>
                        {product.name}
                    </Text>
                    <Badge color="blue" variant="light">
                        {product.category}
                    </Badge>
                </Group>

                <Text size="sm" c="dimmed" lineClamp={2}>
                    {product.description}
                </Text>

                <Group justify="space-between" mt="md">
                    <Text fw={700} size="xl" c="blue">
                        Rp {Number(product.price).toLocaleString('id-ID')}
                    </Text>
                    <Text size="sm" c="dimmed">
                        Stok: {product.stock}
                    </Text>
                </Group>

                <Button
                    fullWidth
                    mt="md"
                    leftSection={<IconShoppingCartPlus size={18} />}
                    onClick={addToCart}
                    loading={loading}
                    disabled={product.stock === 0}
                >
                    {product.stock > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
                </Button>
            </Stack>
        </Card>
    );
}