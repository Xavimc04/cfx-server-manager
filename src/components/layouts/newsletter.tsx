"use client"

import { EmailOutlined } from "@mui/icons-material";
import Input from "../ui/input";
import Submit from "./submit";
import { useFormState } from "react-dom";
import { suscribeToNewsletter } from "@/lib/data";

export default function Newsletter() {
    const [state, dispatch] = useFormState(suscribeToNewsletter, undefined)

    return <article className="w-full xl:w-2/3 2xl:w-1/2 flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between xl:absolute -top-10 bg-black p-4 border border-zinc-800 rounded">
        <div className="flex flex-col gap-2">
            <p className="text-white text-3xl poppins">
                Suscríbete a nuestra newsletter
            </p>

            {
                state && state == 'Correo registrado' ? <p className="text-green-500">
                    Correo suscrito a nuestras noticias
                </p> : <p
                    className="text-red-500"
                >
                    * { state }
                </p>
            }
        </div>

        <form
            className="flex gap-2"
            action={ dispatch }
        >
            <Input 
                placeholder="Tu correo electrónico"
                className="bg-zinc-900"
                name="email"
                type="email"
            />

            <Submit
                className="bg-indigo-300 border border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-indigo-300 transition-all duration-300"
            >
                <EmailOutlined />
            </Submit>
        </form>
    </article>
}