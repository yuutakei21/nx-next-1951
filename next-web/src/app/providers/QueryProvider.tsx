"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { initialize } from "../@openapi";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
});

export const rapini = initialize(instance);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
export default function QueryProvider({
  children,
}: Readonly<{
  children: any;
}>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
