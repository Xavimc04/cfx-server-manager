import { redirect } from 'next/navigation' 
import SinglePost from "@/components/layouts/forum/post/single-post"
import { Suspense } from "react"
import SinglePostSkeleton from "@/components/ui/skeletons/single-post-skeleton"

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

    return <section className="flex flex-col gap-10 -mt-24 self-center justify-center items-center px-5 w-full lg:px-0 lg:w-1/2 xl:w-2/4">
        <Suspense
            key={ slug }
            fallback={ <SinglePostSkeleton /> }
        >
            <SinglePost
                slug={ slug }
            />
        </Suspense>
    </section>
}