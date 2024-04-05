import Image from "next/image";
import Newsletter from "./newsletter";

export default function Footer() {
    return <footer className="relative">
        <Image 
            src="/images/radio_character.png"
            alt="Character image"
            className="absolute bottom-0 right-10 z-10 object-cover hidden 2xl:block"
            width={350}
            height={650}
        />

        {/* @ Footer */}
        <section className="bg-black/20 p-7 text-sm flex flex-wrap justify-center relative">
            {/* @ Newsletter */}
            <Newsletter />

            <div className="w-full xl:w-1/2 flex flex-col gap-10 md:gap-0 text-center md:text-left md:flex-row items-center md:items-start justify-between mt-10">
                {/* @ Information */}
                <article className="flex flex-col gap-2 w-full md:w-1/3">
                    <p className="text-white text-3xl poppins">
                        Nuestras redes
                    </p>

                    <p className="text-gray-600">
                        Síguenos en nuestras redes sociales para estar al tanto de todas las novedades y promociones.
                    </p>

                    <ul className="mt-5 flex flex-col gap-2 poppins">
                        <li>
                            <a 
                                href={ process.env.DISCORD_URL }
                                target="_blank"
                                className="hover:underline text-lg text-indigo-500"
                            >
                                Discord
                            </a>
                        </li>

                        <li>
                            <a 
                                href={ process.env.INSTAGRAM_URL }
                                target="_blank"
                                className="hover:underline text-lg text-pink-500"
                            >
                                Instagram
                            </a>
                        </li>

                        <li>
                            <a 
                                href={ process.env.TWITTER_URL }
                                target="_blank"
                                className="hover:underline text-lg text-blue-400"
                            >
                                Twitter
                            </a>
                        </li>
                    </ul>
                </article>

                {/* @ Resources */}
                <article className="w-full md:w-1/3 text-center md:text-right justify-self-end flex flex-col gap-2">
                    <p className="text-white text-3xl poppins">
                        Recursos
                    </p>

                    <ul className="mt-5 flex flex-col gap-2">
                        <li>
                            <a 
                                href={ `mailto:${ process.env.CONTACT_EMAIL }` } 
                                className="hover:underline text-gray-600"
                            >
                                Contacto
                            </a>
                        </li>
                    </ul>
                </article>
            </div>
        </section>

        {/* @ Rights reserved */}
        <section className="bg-black p-7 text-sm flex justify-center">
            <article className="w-full xl:w-1/2 flex flex-col gap-4 lg:gap-0 lg:flex-row items-center justify-between">
                <p>
                    { process.env.APP_NAME } &copy; { new Date().getFullYear() }, Todos los derechos reservados.
                </p>

                <p className="flex items-center gap-2">
                    <span>Desarrollado por</span>
                    
                    <a 
                        className="text-red-500 hover:underline"
                        href="https://xaviermorell.es" 
                        target="_blank"
                    >
                        Xavier Morell ❤️
                    </a>
                </p>
            </article>
        </section>
    </footer>
}