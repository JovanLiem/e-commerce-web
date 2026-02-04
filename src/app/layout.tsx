import type { Metadata } from 'next';
import './globals.css';
import { ColorSchemeScript } from '@mantine/core';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
    title: 'MyStore - E-Commerce',
    description: 'Toko online untuk berbagai produk',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id" suppressHydrationWarning>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <ThemeProvider>
                    <AuthProvider>
                        <Navbar />
                        {children}
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}