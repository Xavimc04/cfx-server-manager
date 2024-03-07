import DiscordButton from "@/components/ui/buttons/discord"; 

export default function Page() {
    return <main className="h-screen w-screen flex items-center justify-center">
        <article className="w-1/3 flex z-10 flex-col gap-4 rounded-md px-10 py-10">
            <h2 className="text-4xl text-indigo-500 font-bold poppins">
                { process.env.APP_NAME }
            </h2>

            <p className="mb-4">
                Para ingresar y sumergirte en una experiencia única, conecta tu cuenta de Discord. Únete a la comunidad, conoce a otros jugadores y participa en emocionantes eventos.
            </p>
            
            <DiscordButton />
        </article>
    </main>
}