import { CartItem } from '@/types';

export const generateWhatsAppMessage = (
    items: CartItem[],
    total: number,
    userName: string
): string => {
    let message = `*Pesanan Baru dari ${userName}*\n\n`;
    message += `*Detail Produk:*\n`;

    items.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Jumlah: ${item.quantity}\n`;
        message += `   Harga: Rp ${item.price.toLocaleString('id-ID')}\n`;
        message += `   Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n\n`;
    });

    message += `*Total Keseluruhan: Rp ${total.toLocaleString('id-ID')}*`;

    return encodeURIComponent(message);
};

export const sendToWhatsApp = (phoneNumber: string, message: string): string => {
    return `https://wa.me/${phoneNumber}?text=${message}`;
};