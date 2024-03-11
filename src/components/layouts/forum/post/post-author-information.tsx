import { Author } from "@/types/forum/_types";
import Link from "next/link";
import SavePost from "./save-post";
import { isPostSaved } from "@/lib/data";
import { auth } from "@/auth";
import { Suspense } from "react";

export default async function AuthorInformation({
    author,
    postId
} : {
    author: Author,
    postId: number
}) { 
    const session = await auth();
    const isSaved = await isPostSaved(Number(session?.user?.id), postId);

    return author && <section className="absolute -top-24 self-center flex items-center gap-4 w-full px-5 lg:px-0 lg:w-1/2 xl:w-2/4">
        {/* @ Author image */}
        <Link
            href={ `/u/${ author.name }` }
        >
            <img 
                src={ author.image || '' }
                alt={ author.name || '' }
                className="w-16 h-16 rounded-md cursor-pointer transition-all hover:opacity-80"
            />
        </Link>

        {/* @ Author information */}
        <section className="flex-1">
            <Link
                href={ `/u/usuario-test` }
            >
                <h1 className="text-2xl poppins cursor-pointer hover:text-indigo-500 transition-all">
                    { author.name }
                </h1>
            </Link>

            <small className="text-emerald-500">
                Se unió el { author.createdAt.toDateString() }
            </small>
        </section> 

        {/* @ Links */}
        <SavePost 
            postId={ postId }
            isSaved={ isSaved }
        />
    </section>
}