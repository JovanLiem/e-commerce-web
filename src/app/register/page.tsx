'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Container, Paper, Title, TextInput, PasswordInput, Button, Text, Stack, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(name, email, password);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registrasi gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size={420} my={80}>
            <Paper withBorder shadow="md" p={30} radius="md">
                <Title order={2} ta="center" mb="xl">
                    Daftar Akun
                </Title>

                {error && (
                    <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Stack gap="md">
                        <TextInput
                            label="Nama Lengkap"
                            placeholder="John Doe"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextInput
                            label="Email"
                            placeholder="email@example.com"
                            type="email"
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
                            Daftar
                        </Button>
                    </Stack>
                </form>

                <Text ta="center" mt="md" size="sm">
                    Sudah punya akun?{' '}
                    <Link href="/login" style={{ color: 'var(--mantine-color-blue-6)', fontWeight: 600 }}>
                        Login di sini
                    </Link>
                </Text>
            </Paper>
        </Container>
    );
}