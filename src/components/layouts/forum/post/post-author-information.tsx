import { Author } from "@/types/forum/_types"; 
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Link from "next/link";

export function AuthorInformation(author: Author) {
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
        <section className="flex gap-4 items-center"> 
            <button className="rounded border opacity-60 p-2 flex items-center justify-center hover:opacity-100 hover:border-indigo-500 hover:text-indigo-500 transition-all">
                <PersonAddAltOutlinedIcon />
            </button>
        </section>
    </section>
}