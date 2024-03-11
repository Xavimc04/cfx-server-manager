import Navigator from "@/components/layouts/navigator" 
import { redirect } from 'next/navigation'
import Image from "next/image"
import { fetchPost } from "@/lib/data"
import { Author } from "@/types/forum/_types"
import { ReplyOutlined } from "@mui/icons-material"
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

export default async function Page({
    params
} : {
    params: {
        slug: string
    }
}) {  
    if(!params.slug) return redirect('/forum')

    const slug = Number(params.slug)

    if(isNaN(slug)) return redirect('/forum')

    const post = await fetchPost(slug)

    if(!post) return redirect('/forum')

    return <main className="min-h-screen flex flex-col gap-10 mb-10">
        <section className="relative h-80 bg-gradient-to-b flex flex-col from-transparent via-30% to-zinc-900 to-95%">
            <Image 
                src="/images/forum-header-wallpaper.jpg"
                alt="Background image"
                className="h-full w-screen absolute -z-10 object-cover"
                layout="fill"
                objectFit="cover"
            />

            <Navigator /> 

            <AuthorInformation {...post.author} />
        </section> 
        
        <section className="w-1/2 self-center flex flex-col gap-4">
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
    </main>
}

function AuthorInformation(author: Author) {
    return author && <section className="absolute bottom-0 self-center flex items-center gap-4 w-full px-5 lg:px-0 lg:w-1/2 xl:w-2/4">
        {/* @ Author image */}
        <img 
            src={ author.image || '' }
            alt={ author.name || '' }
            className="w-16 h-16 rounded-md"
        />

        <section className="flex-1">
            <h1 className="text-2xl poppins">
                { author.name }
            </h1>

            <small className="text-emerald-500">
                Se unió el { author.createdAt.toDateString() }
            </small>
        </section>

        <section className="flex gap-4 items-center">
            <button className="rounded border opacity-60 p-2 flex items-center justify-center hover:opacity-100 hover:border-indigo-500 hover:text-indigo-500 transition-all">
                <ReplyOutlined />
            </button>

            <button className="rounded border opacity-60 p-2 flex items-center justify-center hover:opacity-100 hover:border-indigo-500 hover:text-indigo-500 transition-all">
                <PersonAddAltOutlinedIcon />
            </button>
        </section>
    </section>
}