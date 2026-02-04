'use client';

import { ReactNode } from 'react';
import {
    MantineProvider,
    createTheme,
    MantineColorScheme,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
    primaryColor: 'blue',
    defaultRadius: 'md',
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [colorScheme, setColorScheme] =
        useLocalStorage<MantineColorScheme>({
            key: 'mantine-color-scheme',
            defaultValue: 'dark',
        });

    return (
        <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
            <Notifications position="top-right" />
            {children}
        </MantineProvider>
    );
}
