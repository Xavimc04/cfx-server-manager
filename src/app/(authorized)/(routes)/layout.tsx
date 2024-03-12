import Navigator from "@/components/layouts/navigator"
import { SessionProvider } from "next-auth/react"
import Image from "next/image"

export default function Layout({
    children
} : {
    children: React.ReactNode
}) {
    return  <main className="min-h-screen flex flex-col gap-10 mb-10">
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
}