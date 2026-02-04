'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link';
import { Container, Paper, Title, TextInput, PasswordInput, Button, Text, Stack, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size={420} my={80}>
            <Paper withBorder shadow="md" p={30} radius="md">
                <Title order={2} ta="center" mb="xl">
                    Login
                </Title>

                {error && (
                    <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Stack gap="md">
                        <TextInput
                            label="Email"
                            placeholder="email@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            label="Password"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button type="submit" fullWidth loading={loading}>
                            Login
                        </Button>
                    </Stack>
                </form>

                <Text ta="center" mt="md" size="sm">
                    Belum punya akun?{' '}
                    <Link href="/register" style={{ color: 'var(--mantine-color-blue-6)', fontWeight: 600 }}>
                        Daftar di sini
                    </Link>
                </Text>
            </Paper>
        </Container>
    );
}