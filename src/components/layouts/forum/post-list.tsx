import { Post, PostList } from "@/types/forum/_types";
import SinglePost from "./single-post";

export default async function PostList({
    data
} : {
    data: Post[]
}) { 
    return <section className="flex flex-col gap-4 self-center px-5 w-full lg:px-0 lg:w-1/2 xl:w-2/4">
        {
            data.map((post: Post) => {
                return <SinglePost key={ post.id } post={ post } />
            })
        }
    </section>
}