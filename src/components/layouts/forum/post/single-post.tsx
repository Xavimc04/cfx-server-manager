import { fetchPost } from "@/lib/data"
import { redirect } from "next/navigation"
import AuthorInformation from "./post-author-information"
import Comments from "./comments"

export default async function SinglePost({
    slug
} : {
    slug: number
}) {
    const post = await fetchPost(slug)

    if(!post) return redirect('/forum')

    return <section className="relative flex flex-col gap-10 items-center w-full">
        <AuthorInformation 
            author={ post.author }
            postId={ post.id }
        />
        
        <article className="flex flex-col gap-4 self-center w-full">
            <h1 className="text-4xl poppins">
                { post.title }
            </h1>

            <small className="text-indigo-500">
                { post.createdAt.toDateString() }
            </small>

            <p className="text-gray-500 mt-5">
                { post.content }
            </p>
        </article>

        <Comments 
            comments={ post.comments } 
            postId={ post.id }
        />
    </section>
}