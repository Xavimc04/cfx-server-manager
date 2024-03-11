import { fetchPost } from "@/lib/data"
import { redirect } from "next/navigation"
import { AuthorInformation } from "./post-author-information"

export default async function SinglePost({
    slug
} : {
    slug: number
}) {
    const post = await fetchPost(slug)

    if(!post) return redirect('/forum')
    
    return <section className="w-1/2 self-center flex flex-col gap-4">
        <AuthorInformation {...post.author} />
        
        <h1 className="text-4xl poppins">
            { post.title }
        </h1>

        <small className="text-indigo-500">
            { post.createdAt.toDateString() }
        </small>

        <p className="text-gray-500 mt-5">
            { post.content }
        </p>
    </section>
}