import UserContent from "@/components/layouts/u/user-content"
import ProfileSkeleton from "@/components/ui/skeletons/profile-skeleton"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default function Page({
    params,
    searchParams
} : {
    params: {
        slug: string
    },
    searchParams: {
        query?: string,
        page?: number
    }
}) {
    const slug = params.slug
    const query = searchParams?.query || '';
    const page = Number(searchParams?.page) || 1;

    if(!slug) return redirect('/')

    return <section className="w-full px-5 lg:px-0 lg:w-1/2 xl:w-2/4 self-center flex flex-col gap-7 -mt-20 z-20 mb-10">
        <Suspense
            fallback={ <ProfileSkeleton /> }
        >
            <UserContent 
                slug={ slug }
                query={ query }
                page={ page }
            />
        </Suspense>
    </section>
}