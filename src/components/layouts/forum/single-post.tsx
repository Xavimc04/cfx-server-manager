import { Post } from "@/types/forum/_types";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Link from "next/link";

export default function SinglePost({
    post
} : {
    post: Post
}) {
    return <Link
        href={ `/forum/post/${ post.id }` }
    >
        <article className="border border-zinc-700 p-3 rounded flex items-center gap-4">
            {/* @ Image */}
            <img 
                src={ post.author.image || '' }
                alt=''
                className="w-10 h-10 rounded-md"
            />
            
            {/* @ Information */}
            <section className="flex-1">
                <h2 className="poppins">{ post.title }</h2>

                <p className="text-sm text-gray-400">{ post.author.name }, { post.createdAt.toDateString() }</p>
            </section>

            {/* @ Stats */}
            <section className="flex items-center gap-3">
                <ModeCommentOutlinedIcon />

                { post.comments.length }
            </section>
        </article>
    </Link>
}