import { Post } from "@/types/forum/_types";

export default function SinglePost({
    post
} : {
    post: Post
}) {
    return <article className="border bg-gray-50 p-3 rounded flex items-center gap-4">
        <img 
            src={ post.author.image }
            alt={ post.author.name }
            className="w-16 h-16 rounded-md"
        />
        
        <section>
            <h2 className="text-xl poppins">{ post.title }</h2>

            <p className="text-sm">{ post.author.name }, { post.createdAt.toDateString() }</p>
        </section>
    </article>
}