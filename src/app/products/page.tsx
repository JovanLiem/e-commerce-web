'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { Container, Title, Group, Button, SimpleGrid, Loader, Text, Stack } from '@mantine/core';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('Semua');

    const categories = ['Semua', 'Makanan', 'Minuman', 'Elektronik', 'Fashion', 'Lainnya'];

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        try {
            const url = category === 'Semua' ? '/api/products' : `/api/products?category=${category}`;
            const { data } = await axios.get(url);
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size="xl" pb={80}>
            <Stack gap="xl">
                <Title order={1}>Produk Kami</Title>

                <Group gap="xs">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={category === cat ? 'filled' : 'light'}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </Button>
                    ))}
                </Group>

                {loading ? (
                    <Stack align="center" py={60}>
                        <Loader size="lg" />
                    </Stack>
                ) : products.length === 0 ? (
                    <Stack align="center" py={60}>
                        <Text c="dimmed">Belum ada produk tersedia</Text>
                    </Stack>
                ) : (
                    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </SimpleGrid>
                )}
            </Stack>
        </Container>
    );
}