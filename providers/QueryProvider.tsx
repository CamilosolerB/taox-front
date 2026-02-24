'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Crear una instancia de QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

/**
 * Proveedor de React Query
 * 
 * Este componente envuelve toda la aplicación para proporcionar
 * contexto de queries y mutations.
 * 
 * Uso en app/layout.tsx:
 * 
 * import { QueryProvider } from '@/providers/QueryProvider';
 * 
 * export default function RootLayout({
 *   children,
 * }: {
 *   children: React.ReactNode
 * }) {
 *   return (
 *     <html lang="es">
 *       <body>
 *         <QueryProvider>
 *           {children}
 *         </QueryProvider>
 *       </body>
 *     </html>
 *   )
 * }
 */

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default QueryProvider;
