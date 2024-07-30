'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})
export default function QueryProvider({
  children,
}: Readonly<{
  children: any
}>) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
