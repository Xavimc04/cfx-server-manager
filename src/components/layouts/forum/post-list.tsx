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
        <section className="flex flex-col gap-4 self-center w-full">
            {
                data.map((post: any) => {
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