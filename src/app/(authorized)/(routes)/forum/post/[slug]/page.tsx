import Navigator from "@/components/layouts/navigator" 
import { redirect } from 'next/navigation'
import Image from "next/image"
import { fetchPost } from "@/lib/data"

export default async function Page({
    params
} : {
    params: {
        slug: string
    }
}) {  
    if(!params.slug) return redirect('/forum')

    const slug = Number(params.slug)

    if(isNaN(slug)) return redirect('/forum')

    const post = await fetchPost(slug)

    if(!post) return redirect('/forum')

    return <main className="min-h-screen flex flex-col gap-10 mb-10">
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
        
        <section className="w-1/2 self-center flex flex-col gap-4">
            <h1 className="text-4xl poppins">
                { post.title }
            </h1>

            <p className="text-gray-500">
                { post.content }
            </p>
        </section>
    </main>
}