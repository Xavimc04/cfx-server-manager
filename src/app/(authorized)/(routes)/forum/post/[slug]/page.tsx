import { redirect } from 'next/navigation' 
import SinglePost from "@/components/layouts/forum/post/single-post"
import { Suspense } from "react"
import SinglePostSkeleton from "@/components/ui/skeletons/single-post.skeleton"
import Image from 'next/image'
import Navigator from '@/components/layouts/navigator'

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

        <div className='flex'>
            <Suspense
                key={ slug }
                fallback={ <SinglePostSkeleton /> }
            >
                <SinglePost
                    slug={ slug }
                />
            </Suspense>
        </div>
    </main> 
}