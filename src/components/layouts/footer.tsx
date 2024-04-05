import Image from "next/image";
import Input from "../ui/input";
import Submit from "./submit";
import { EmailOutlined } from "@mui/icons-material";

export default function Footer() {
    return <footer className="relative">
        <Image 
            src="/images/radio_character.png"
            alt="Character image"
            className="absolute bottom-0 right-10 z-10 object-cover hidden xl:block"
            width={350}
            height={650}
        />

        {/* @ Footer */}
        <section className="bg-black/20 p-7 text-sm flex justify-center relative">
            {/* @ Newsletter */}
            <article className="w-1/2 flex items-center justify-between absolute -top-10 bg-black p-4 border border-zinc-800 rounded">
                <p className="text-white text-3xl poppins">
                    Suscríbete a nuestra newsletter
                </p>

                <form className="flex gap-2">
                    <Input 
                        placeholder="Tu correo electrónico"
                        className="bg-zinc-900"
                    />

                    <Submit
                        className="bg-indigo-300 border border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-indigo-300 transition-all duration-300"
                    >
                        <EmailOutlined />
                    </Submit>
                </form>
            </article>

            <div className="w-1/2 flex items-start justify-between mt-10">
                {/* @ Information */}
                <article className="flex flex-col gap-2 w-1/3">
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
                <article className="w-1/3 text-right justify-self-end flex flex-col gap-2">
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
            <article className="w-1/2 flex items-center justify-between">
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