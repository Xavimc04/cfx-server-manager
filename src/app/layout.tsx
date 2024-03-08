import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/twMerge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: process.env.APP_NAME,
    description: process.env.APP_DESCRIPTION,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={ cn(inter.className, 'min-h-screen min-w-screen bg-zinc-900 text-white') }>
                { children }
            </body>
        </html>
    );
}
