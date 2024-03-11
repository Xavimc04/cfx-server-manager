"use client"

import { commentOnPost } from "@/lib/data";
import { SendAndArchiveOutlined } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";  
import { useFormState } from "react-dom";

export default function CreateComment({
    postId
} : {
    postId: number
}) {  
    const [state, dispatch] = useFormState(commentOnPost, undefined)
    const { data: session } = useSession();

    if (!session) return;

    return <AnimatePresence>
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: .3 }}
            className="mt-10 flex flex-col gap-2 border-t border-zinc-700 py-10"
        >
            <h2 className="text-2xl poppins text-yellow-500">
                Deja tu comentario
            </h2>

            <p>
                Por favor, antes de escribir un comentario piensa en las personas que lo van a leer.
            </p>

            <form 
                className="mt-5 w-full flex items-center flex-wrap gap-4"
                action={ dispatch }
            >
                <input type="hidden" name="postId" defaultValue={ postId } />
                <input type="hidden" name="authorId" defaultValue={ session?.user?.id } />

                {
                    state && <p className="text-sm text-red-500 w-full">
                        * { state }
                    </p>
                }

                <input 
                    className="bg-zinc-800 px-4 border border-zinc-700 shadow-lg flex-1 py-2 rounded-md focus:outline-none focus:ring-0"
                    placeholder="..."
                    name="content" 
                />

                <button 
                    type="submit"
                    className="bg-indigo-300 border border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-indigo-300 transition-all duration-300"
                >
                    <SendAndArchiveOutlined />
                </button>
            </form>
        </motion.section>
    </AnimatePresence>
}