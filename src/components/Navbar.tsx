'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Group, Button, ActionIcon, Text, Container, useMantineColorScheme } from '@mantine/core';
import { IconShoppingCart, IconSun, IconMoon, IconUser, IconLogout } from '@tabler/icons-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { toggleColorScheme } = useMantineColorScheme();

    return (
        <div style={{ borderBottom: '1px solid var(--mantine-color-gray-3)', marginBottom: '2rem' }}>
            <Container size="xl" py="md">
                <Group justify="space-between">
                    <Group>
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <Text size="xl" fw={700} c="blue">
                                🛒 MyStore
                            </Text>
                        </Link>
                        <Link href="/products" style={{ textDecoration: 'none', marginLeft: '1rem' }}>
                            <Text c="dimmed">Produk</Text>
                        </Link>
                        <Link href="/about" style={{ textDecoration: 'none' }}>
                            <Text c="dimmed">Tentang Kami</Text>
                        </Link>
                    </Group>

                    <Group>
                        <ActionIcon
                            variant="default"
                            onClick={toggleColorScheme}
                            size="lg"
                            aria-label="Toggle color scheme"
                        >
                            <IconSun size={20} stroke={1.5} style={{ display: 'var(--mantine-color-scheme-light)' }} />
                            <IconMoon size={20} stroke={1.5} style={{ display: 'var(--mantine-color-scheme-dark)' }} />
                        </ActionIcon>

                        {user ? (
                            <>
                                <Link href="/cart" style={{ textDecoration: 'none' }}>
                                    <Button variant="subtle" leftSection={<IconShoppingCart size={18} />}>
                                        Keranjang
                                    </Button>
                                </Link>
                                <Text size="sm" c="dimmed">
                                    Halo, {user.name}
                                </Text>
                                <Button
                                    color="red"
                                    variant="light"
                                    leftSection={<IconLogout size={18} />}
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" style={{ textDecoration: 'none' }}>
                                    <Button variant="subtle" leftSection={<IconUser size={18} />}>
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register" style={{ textDecoration: 'none' }}>
                                    <Button>Register</Button>
                                </Link>
                            </>
                        )}
                    </Group>
                </Group>
            </Container>
        </div>
    );
}