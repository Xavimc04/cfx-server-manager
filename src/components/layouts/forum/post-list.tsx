import { Post } from "@/types/forum/_types";
import SinglePost from "./single-post";
import { Fragment } from "react";
import Pagination from "../pagination";
import { getFilteredPosts } from "@/lib/data";

export default async function PostList({
    query, 
    page
} : {
    query: string,
    page: number
}) { 
    const {
        data,
        totalPages
    } = await getFilteredPosts({
        query, 
        page
    });

    return <Fragment>
        <section className="flex flex-col gap-4 self-center px-5 w-full lg:px-0 lg:w-1/2 xl:w-2/4">
            {
                data.map((post: Post) => {
                    return <SinglePost key={ post.id } post={ post } />
                })
            }
        </section>

        <Pagination 
            currentPage={ page }
            totalPages={ totalPages }
        />
    </Fragment>
}