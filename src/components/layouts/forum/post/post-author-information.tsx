import { Author } from "@/types/forum/_types";
import { ReplyOutlined } from "@mui/icons-material"
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

export function AuthorInformation(author: Author) {
    return author && <section className="absolute -top-24 self-center flex items-center gap-4 w-full px-5 lg:px-0 lg:w-1/2 xl:w-2/4">
        {/* @ Author image */}
        <img 
            src={ author.image || '' }
            alt={ author.name || '' }
            className="w-16 h-16 rounded-md"
        />

        {/* @ Author information */}
        <section className="flex-1">
            <h1 className="text-2xl poppins">
                { author.name }
            </h1>

            <small className="text-emerald-500">
                Se unió el { author.createdAt.toDateString() }
            </small>
        </section>

        {/* @ Links */}
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