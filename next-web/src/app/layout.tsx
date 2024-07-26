import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TailwindMaterial from "./providers/TailwindMaterial";
import { ToastProvider } from "./components/Toast";
import QueryProvider from "./providers/QueryProvider";
import AuthProvider from "./providers/AuthProvider";

const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: any;
}>) {
  return (
    <html lang="jp">
      <body className={inter.className} suppressHydrationWarning={true}>
        <TailwindMaterial>
          <ToastProvider>
            <QueryProvider>
              <AuthProvider>{children}</AuthProvider>
            </QueryProvider>
          </ToastProvider>
        </TailwindMaterial>
      </body>
    </html>
  );
}
