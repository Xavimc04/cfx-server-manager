import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/twMerge";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Navigator from "@/components/layouts/navigator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: process.env.APP_NAME,
    description: process.env.APP_DESCRIPTION,
    icons: {
        icon: '/images/gta-v-icon.png'
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={ cn(inter.className, 'min-h-screen min-w-screen bg-zinc-900 text-white') }>
                <main className="min-h-screen flex flex-col gap-10 mb-10">
                    <SessionProvider>  
                        <section className="relative h-80 bg-gradient-to-b flex flex-col from-transparent via-30% to-zinc-900 to-95%">
                            <Image 
                                src="/images/forum-header-wallpaper.jpg"
                                alt="Background image"
                                className="h-full w-screen absolute -z-10 object-cover"
                                layout="fill"
                                objectFit="cover"
                            />

                            <Navigator />
                        </section>

                        { children }
                    </SessionProvider>
                </main> 
            </body>
        </html>
    );
}
