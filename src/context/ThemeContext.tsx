'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { MantineProvider, createTheme, MantineColorScheme } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

interface ThemeContextType {
    colorScheme: MantineColorScheme;
    toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const theme = createTheme({
    primaryColor: 'blue',
    defaultRadius: 'md',
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const preferredColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useLocalStorage<MantineColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: preferredColorScheme,
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = () => {
        setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
            <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
                <Notifications position="top-right" />
                {children}
            </MantineProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};