import { Comment } from "@/types/forum/_types"
import CreateComment from "./create-comment"

export default function Comments({
    comments,
    postId
} : {
    comments: Comment[],
    postId: number
}) {
    return <section className="self-center flex flex-col px-5 w-full lg:px-0 lg:w-1/2 xl:w-2/4 mt-10">
        {
            comments.map((comment: Comment) => {
                return <article key={ comment.id } className="flex flex-col">
                    <div className="flex gap-4">
                        <img 
                            src={ comment.author.image || '' } 
                            alt={ comment.author.name || '' }
                            className="rounded-md w-10 h-10 self-center"
                        />
            
                        <section className="flex flex-col">
                            <h1 className="text-xl poppins">
                                { comment.author.name }
                            </h1>
            
                            <p className="text-indigo-500 text-sm">
                                { comment.createdAt.toDateString() }
                            </p>
                        </section>
                    </div>

                    <p className="mt-3 text-gray-500">
                        { comment.content }
                    </p>
                </article>
            })
        }

        {
            comments.length === 0 && <p className="text-red-500">
                * No hay comentarios asociados al post
            </p>
        }

        <CreateComment 
            postId={ postId }
        />
    </section>
}