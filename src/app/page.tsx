export default function Page() {
    return <section className="self-center w-1/2 z-20">
        <article className="text-center -mt-20 flex flex-col">
            {/* @ Announce */}
            <p className="mb-4 border self-center px-5 py-2 rounded-full bg-indigo-500/20 border-indigo-500">
                🎁 Comienza tu aventura el 1 de Junio 🎁
            </p>

            {/* @ Headings */}
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">La história del RP comienza en { process.env.APP_NAME }</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{ process.env.APP_DESCRIPTION }</p>
        </article>
    </section>
}