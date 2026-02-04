'use client';

import { CartItem as CartItemType } from '@/types';
import axios from 'axios';
import { Card, Image, Text, Group, ActionIcon, Stack, Button } from '@mantine/core';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface CartItemProps {
    item: CartItemType;
    onUpdate: () => void;
}

export default function CartItem({ item, onUpdate }: CartItemProps) {
    const updateQuantity = async (newQuantity: number) => {
        if (newQuantity < 1) return;

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                '/api/cart',
                {
                    productId: item.product_id,
                    quantity: newQuantity,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            onUpdate();
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Gagal mengupdate jumlah',
                color: 'red',
            });
        }
    };

    const removeItem = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/cart?productId=${item.product_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            notifications.show({
                title: 'Berhasil',
                message: 'Item dihapus dari keranjang',
                color: 'green',
            });
            onUpdate();
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Gagal menghapus item',
                color: 'red',
            });
        }
    };

    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group wrap="nowrap">
                <Image src={item.image} w={80} h={80} radius="md" fit="cover" />

                <Stack gap="xs" style={{ flex: 1 }}>
                    <Text fw={600}>{item.name}</Text>
                    <Text fw={700} c="blue">
                        Rp {Number(item.price).toLocaleString('id-ID')}
                    </Text>
                </Stack>

                <Group gap="xs">
                    <ActionIcon
                        variant="default"
                        onClick={() => updateQuantity(item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        <IconMinus size={16} />
                    </ActionIcon>
                    <Text fw={600} style={{ minWidth: 30, textAlign: 'center' }}>
                        {item.quantity}
                    </Text>
                    <ActionIcon variant="default" onClick={() => updateQuantity(item.quantity + 1)}>
                        <IconPlus size={16} />
                    </ActionIcon>
                </Group>

                <Stack gap="xs" align="flex-end" style={{ minWidth: 120 }}>
                    <Text fw={700} size="lg">
                        Rp {(Number(item.price) * item.quantity).toLocaleString('id-ID')}
                    </Text>
                    <Button
                        variant="subtle"
                        color="red"
                        size="xs"
                        leftSection={<IconTrash size={14} />}
                        onClick={removeItem}
                    >
                        Hapus
                    </Button>
                </Stack>
            </Group>
        </Card>
    );
}