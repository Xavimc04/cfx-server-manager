import { auth } from "@/auth";
import DiscordButton from "@/components/ui/buttons/discord";  
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();

    if(session) return redirect('/');

    return <article className="w-[90%] md:w-1/2 xl:w-1/3 bg-zinc-900 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex z-10 flex-col gap-4 rounded-md px-10 py-10">
        <h2 className="text-4xl font-bold poppins">
            { process.env.APP_NAME }
        </h2>

        <p className="mb-4 text-gray-500">
            Para ingresar y sumergirte en una experiencia única, conecta tu cuenta de Discord. Únete a la comunidad, conoce a otros jugadores y participa en emocionantes eventos.
        </p>
        
        <DiscordButton />
    </article>
}