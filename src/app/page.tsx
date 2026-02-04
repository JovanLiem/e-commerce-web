import Link from 'next/link';
import { Container, Title, Text, Button, Group, SimpleGrid, Card, Stack } from '@mantine/core';

export default function Home() {
    return (
        <Container size="xl">
            <Stack align="center" gap="xl" py={60}>
                <Title order={1} size={48} ta="center">
                    Selamat Datang di <Text span c="blue" inherit>MyStore</Text>
                </Title>

                <Text size="xl" c="dimmed" ta="center" maw={700}>
                    Temukan berbagai produk berkualitas dengan harga terbaik. Mulai dari makanan, minuman, elektronik, fashion, dan masih banyak lagi!
                </Text>

                <Group>
                    <Link href="/products" style={{ textDecoration: 'none' }}>
                        <Button size="lg">Lihat Produk</Button>
                    </Link>
                    <Link href="/about" style={{ textDecoration: 'none' }}>
                        <Button size="lg" variant="default">Tentang Kami</Button>
                    </Link>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mt={40} w="100%">
                    <Card shadow="sm" padding="xl" radius="md" withBorder>
                        <Stack align="center" gap="md">
                            <Text fz={48}>🛍️</Text>
                            <Title order={3} ta="center">Produk Berkualitas</Title>
                            <Text size="sm" c="dimmed" ta="center">
                                Kami menyediakan produk pilihan dengan kualitas terbaik
                            </Text>
                        </Stack>
                    </Card>

                    <Card shadow="sm" padding="xl" radius="md" withBorder>
                        <Stack align="center" gap="md">
                            <Text fz={48}>💬</Text>
                            <Title order={3} ta="center">Pesan via WhatsApp</Title>
                            <Text size="sm" c="dimmed" ta="center">
                                Checkout langsung ke WhatsApp untuk kemudahan berbelanja
                            </Text>
                        </Stack>
                    </Card>

                    <Card shadow="sm" padding="xl" radius="md" withBorder>
                        <Stack align="center" gap="md">
                            <Text fz={48}>🚀</Text>
                            <Title order={3} ta="center">Mudah & Cepat</Title>
                            <Text size="sm" c="dimmed" ta="center">
                                Proses belanja yang simple dan user-friendly
                            </Text>
                        </Stack>
                    </Card>
                </SimpleGrid>
            </Stack>
        </Container>
    );
}