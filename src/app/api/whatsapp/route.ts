import { NextRequest, NextResponse } from 'next/server';
import { generateWhatsAppMessage, sendToWhatsApp } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
    try {
        const { items, total, userName } = await request.json();

        const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567';
        const message = generateWhatsAppMessage(items, total, userName);
        const whatsappUrl = sendToWhatsApp(phoneNumber, message);

        return NextResponse.json({ url: whatsappUrl });
    } catch (error) {
        console.error('WhatsApp error:', error);
        return NextResponse.json(
            { error: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}