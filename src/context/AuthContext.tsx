'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const { data } = await axios.get('/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(data.user);
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    };

    const login = async (email: string, password: string) => {
        const { data } = await axios.post('/api/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        setUser(data.user);
        router.push('/products');
    };

    const register = async (name: string, email: string, password: string) => {
        const { data } = await axios.post('/api/auth/register', { name, email, password });
        localStorage.setItem('token', data.token);
        setUser(data.user);
        router.push('/products');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};