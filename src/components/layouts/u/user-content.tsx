import { fetchUserByName } from "@/lib/data";
import { redirect } from "next/navigation";
import { Fragment, Suspense } from "react";
import Counter from "./counter"; 
import ForumPostSkeleton from "@/components/ui/skeletons/forum-post-skeleton";
import PostList from "../forum/post-list";
import QueryFilter from "../forum/query-filter";
import { auth } from "@/auth"; 
import Logout from "./logout";
import Payments from "./payments";
import Search from "../search";
import CreatePostModal from "../forum/create-post-modal";

export default async function UserContent({
    slug,
    query,
    page
} : {
    slug: string,
    query: string,
    page: number
}) {
    const user = await fetchUserByName(slug);
    const session = await auth();

    if(!user) return redirect('/404')

    return <Fragment>
        <section className="flex items-center gap-4 w-full">
            {/* @ User image */}
            <img 
                src={ user.image || '' }
                alt=''
                className="w-16 h-16 rounded-md cursor-pointer transition-all hover:opacity-80"
            />

            {/* @ User information */}
            <section className="flex-1">
                <h1 className="text-2xl poppins cursor-pointer hover:text-indigo-500 transition-all">
                    { user.name }
                </h1>

                <small className="text-emerald-500">
                    Se unió el { user.createdAt.toDateString() }
                </small>
            </section>  

            {/* @ Logout */}
            {
                session?.user?.id && Number(session.user.id) === Number(user.id) && <Logout />
            }
        </section>

        <section className="flex items-end gap-10 mt-5">
            <Counter count={ user._count.posts }>
                <p className="text-lg poppins text-zinc-600">
                    Publicaciones
                </p>
            </Counter>
            
            <Counter count={ user._count.comments }>
                <p className="text-lg poppins text-zinc-600">
                    Comentarios
                </p>
            </Counter>
        </section>

        <section className="self-center flex items-center gap-4 w-full">
            <Search />

            {
                session?.user?.id && Number(session.user.id) === Number(user.id) && <CreatePostModal />
            }
        </section>

        <Suspense
            key={ query + page + user.id }
            fallback={ <ForumPostSkeleton /> }
        >
            <PostList
                query={ query }
                page={ page }
                authorId={ user.id }
            />
        </Suspense>

        {
            session?.user?.id && Number(session.user.id) === Number(user.id) && <Payments />
        }
    </Fragment>
}