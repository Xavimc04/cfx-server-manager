import { getFilteredPosts } from "@/lib/data"
import { PostList } from "@/types/forum/_types";

export default async function PostList(queryParams : PostList) {
    const posts = await getFilteredPosts(queryParams);

    return <section>
        {
            posts.map(post => <article key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </article>)
        }
    </section>
}