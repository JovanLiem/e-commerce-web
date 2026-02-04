'use client';

import { Container, Title, Text, Card, Stack, SimpleGrid, List, ThemeIcon, Group } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';

export default function AboutPage() {
    return (
        <Container size="md">
            <Stack gap="xl">
                <Title order={1}>Tentang Kami</Title>

                <Card shadow="sm" padding="xl" radius="md" withBorder>
                    <Stack gap="md">
                        <Title order={2}>Selamat Datang di MyStore</Title>
                        <Text c="dimmed">
                            MyStore adalah platform e-commerce modern yang dibangun dengan teknologi terkini. Kami
                            menyediakan berbagai produk berkualitas mulai dari makanan, minuman, elektronik,
                            fashion, dan masih banyak lagi.
                        </Text>
                        <Text c="dimmed">
                            Misi kami adalah memberikan pengalaman belanja online yang mudah, cepat, dan
                            menyenangkan untuk semua pelanggan. Dengan integrasi WhatsApp, proses pemesanan
                            menjadi lebih personal dan efisien.
                        </Text>
                    </Stack>
                </Card>

                <Card shadow="sm" padding="xl" radius="md" withBorder>
                    <Stack gap="md">
                        <Title order={2}>Teknologi yang Digunakan</Title>
                        <SimpleGrid cols={2}>
                            <div>
                                <Text fw={600} c="blue" mb="xs">
                                    Frontend
                                </Text>
                                <List spacing="xs" size="sm">
                                    <List.Item>Next.js 14</List.Item>
                                    <List.Item>TypeScript</List.Item>
                                    <List.Item>Mantine UI</List.Item>
                                    <List.Item>React Context API</List.Item>
                                </List>
                            </div>
                            <div>
                                <Text fw={600} c="blue" mb="xs">
                                    Backend
                                </Text>
                                <List spacing="xs" size="sm">
                                    <List.Item>PostgreSQL</List.Item>
                                    <List.Item>JWT Authentication</List.Item>
                                    <List.Item>RESTful API</List.Item>
                                    <List.Item>WhatsApp Integration</List.Item>
                                </List>
                            </div>
                        </SimpleGrid>
                    </Stack>
                </Card>

                <Card shadow="sm" padding="xl" radius="md" withBorder>
                    <Stack gap="md">
                        <Title order={2}>Fitur Unggulan</Title>
                        <Stack gap="md">
                            <div>
                                <Group gap="sm" align="flex-start">
                                    <ThemeIcon color="blue" size={24} radius="xl">
                                        🔐
                                    </ThemeIcon>
                                    <div>
                                        <Text fw={600}>Autentikasi Aman</Text>
                                        <Text size="sm" c="dimmed">
                                            Sistem login dan register dengan JWT untuk keamanan data Anda
                                        </Text>
                                    </div>
                                </Group>
                            </div>

                            <div>
                                <Group gap="sm" align="flex-start">
                                    <ThemeIcon color="blue" size={24} radius="xl">
                                        🛒
                                    </ThemeIcon>
                                    <div>
                                        <Text fw={600}>Shopping Cart Persisten</Text>
                                        <Text size="sm" c="dimmed">
                                            Keranjang belanja Anda tersimpan di database dan tidak akan hilang
                                        </Text>
                                    </div>
                                </Group>
                            </div>

                            <div>
                                <Group gap="sm" align="flex-start">
                                    <ThemeIcon color="blue" size={24} radius="xl">
                                        💬
                                    </ThemeIcon>
                                    <div>
                                        <Text fw={600}>Checkout via WhatsApp</Text>
                                        <Text size="sm" c="dimmed">
                                            Pesan langsung ke WhatsApp dengan detail pesanan lengkap
                                        </Text>
                                    </div>
                                </Group>
                            </div>

                            <div>
                                <Group gap="sm" align="flex-start">
                                    <ThemeIcon color="blue" size={24} radius="xl">
                                        🌓
                                    </ThemeIcon>
                                    <div>
                                        <Text fw={600}>Dark Mode</Text>
                                        <Text size="sm" c="dimmed">
                                            Beralih antara tema terang dan gelap sesuai preferensi Anda
                                        </Text>
                                    </div>
                                </Group>
                            </div>
                        </Stack>
                    </Stack>
                </Card>

                <Stack align="center" gap="xs" pb={80}>
                    <Text c="dimmed" size="sm">
                        Dibuat dengan ❤️ menggunakan Next.js, PostgreSQL, dan Mantine UI
                    </Text>
                    <Text c="dimmed" size="xs">
                        © 2024 MyStore. All rights reserved.
                    </Text>
                </Stack>
            </Stack>
        </Container>
    );
}