import Footer from "@/components/layouts/footer";
import { CopyAllOutlined, LinkOffOutlined } from "@mui/icons-material";
import Image from "next/image";
import { Fragment } from "react";

export default function Page() {
    return <Fragment>
        <section className="self-center z-20 px-5 w-full lg:px-0 lg:w-1/2 xl:w-2/4">
            <article className="text-center -mt-20 flex flex-col">
                {/* @ Announce */}
                <p className="mb-4 border self-center px-5 py-2 rounded-full bg-indigo-500/20 border-indigo-500">
                    🎁 Comienza tu aventura el 1 de Junio 🎁
                </p>

                {/* @ Headings */}
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">La história del RP comienza en { process.env.APP_NAME }</h1>
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{ process.env.APP_DESCRIPTION }</p>
            </article>

            {/* @ Video */}
            <iframe className="w-full h-[500px] mt-16 rounded-md" src="https://www.youtube-nocookie.com/embed/Tc7_akJSdAQ?si=XgAUXONArC3ViZit&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </section>

        {/* @ How to play */}
        <section className="z-20 w-1/2 flex flex-col gap-7 self-center my-20">
            {/* @ Download GTA V */}
            <article className="flex items-center gap-4 border border-zinc-800 p-4 rounded">
                <Image
                    src="/images/gta-v-icon.png"
                    alt="Download GTA V"
                    width={40}
                    height={40}
                />

                <div className="flex flex-col gap-2 flex-1">
                    <h2 className="text-2xl poppins leading-none tracking-tight text-white">Descarga GTA V</h2>
                    <p className="text-sm font-normal text-gray-500">Descarga e instala GTA V en tu PC.</p>
                </div>

                <a>
                    <LinkOffOutlined />  
                </a>
            </article>

            {/* @ Install Fivem */}
            <article className="flex items-center gap-4 border border-zinc-800 p-4 rounded">
                <Image
                    src="/images/gta-v-icon.png"
                    alt="Download GTA V"
                    width={40}
                    height={40}
                />

                <div className="flex flex-col gap-2 flex-1">
                    <h2 className="text-2xl poppins leading-none tracking-tight text-white">Descarga GTA V</h2>
                    <p className="text-sm font-normal text-gray-500">Descarga e instala GTA V en tu PC.</p>
                </div>

                <a>
                    <LinkOffOutlined />  
                </a>
            </article>

            {/* @ Connect to server */}
            <article className="flex items-center bg-black gap-4 border border-zinc-800 p-4 rounded">
                <div className="flex flex-col gap-4 flex-1">
                    {/* @ Terminal  */}
                    <section className="flex items-center gap-4">
                        <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                        <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                        <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    </section>

                    connect cfx.re/join/abc123
                </div>

                <CopyAllOutlined />
            </article>
        </section>

        {/* @ Background */}
        <section className="h-screen -mt-80 relative -z-20 flex flex-col items-center justify-center"> 
            <Image
                className="grayscale w-full h-full object-cover"
                style={{
                    opacity: 0.03
                }}
                src="/images/landing-vehicle-wallpaper.jpg"
                alt="Vehicle wallpaper"
                layout="fill"
            />

            <div className="h-20 w-screen absolute top-0 bg-gradient-to-b from-zinc-900"></div>
            <div className="h-20 w-screen absolute bottom-0 bg-gradient-to-t from-zinc-900"></div>

            {/* @ Adventure section */}
            <section className="z-20 w-1/2 self-center flex items-center justify-between mt-40">
                <article className="w-1/2 flex items-start flex-col gap-7">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
                        ¿Estás listo para tu próxima
                        
                        <p className="underline underline-offset-3 decoration-8 decoration-blue-400">
                            aventura?
                        </p>
                    </h1>
                    
                    <p className="text-lg font-normal text-gray-500 lg:text-xl">
                        { process.env.APP_NAME } es un servidor de Roleplay en español basado en la ciudad de Los Santos, California. 
                        Con una economía realista, trabajos, empresas, drogas, mafias, policías, médicos, abogados, y mucho más. 
                        ¡Comienza tu aventura en { process.env.APP_NAME }!
                    </p>
                </article>

                <Image
                    src="/images/neon_rich.png"
                    alt="Franklin"
                    width={300}
                    height={400}
                />
            </section>
        </section>

        <Footer />
    </Fragment>
}