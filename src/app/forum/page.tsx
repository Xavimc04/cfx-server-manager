import PostList from "@/components/layouts/forum/post-list";
import QueryFilter from "@/components/layouts/forum/query-filter"; 
import ForumPostSkeleton from "@/components/ui/skeletons/forum-post-skeleton";   
import { Suspense } from "react";

export default async function Page({
    searchParams
} : {
    searchParams?: {
        query?: string,
        page?: number
    }
}) {
    const query = searchParams?.query || '';
    const page = Number(searchParams?.page) || 1; 

    return <section className="flex flex-col gap-10 self-center justify-center px-5 w-full lg:px-0 lg:w-1/2 xl:w-2/4 mb-10">
        <section className="self-center flex -mt-20 z-20 items-center gap-4 w-full">
            <QueryFilter />
        </section>

        <Suspense
            key={ query + page }
            fallback={ <ForumPostSkeleton /> }
        >
            <PostList 
                query={ query }
                page={ page }
            />
        </Suspense>
    </section>
}