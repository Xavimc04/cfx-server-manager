import PostList from "@/components/layouts/forum/post-list";
import QueryFilter from "@/components/layouts/forum/query-filter";
import Navigator from "@/components/layouts/navigator";
import ForumPostSkeleton from "@/components/ui/skeletons/forum-post-skeleton";
import Image from "next/image";
import { Suspense } from "react";

export default async function Page({
    searchParams
} : {
    searchParams?: {
        query?: string,
        page?: number,
        category?: string
    }
}) {
    const query = searchParams?.query || '';
    const page = Number(searchParams?.page) || 1;
    const category = searchParams?.category || '';

    return <main className="min-h-screen">
        <section className="relative h-80 bg-gradient-to-b flex flex-col from-transparent via-30% to-white dark:to-zinc-900 to-95%">
            <Image 
                src="/images/forum-header-wallpaper.jpg"
                alt="Background image"
                className="h-full w-screen absolute -z-10 object-cover"
                layout="fill"
                objectFit="cover"
            />

            <Navigator />

            <QueryFilter />
        </section>

        <Suspense
            key={ query + page + category }
            fallback={ <ForumPostSkeleton /> }
        >
            <PostList 
                query={query}
                page={page}
                category={category}
            />
        </Suspense>
    </main>
}