'use client'

import { registerForumPost } from "@/lib/data";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { useFormState } from "react-dom";
import AddIcon from '@mui/icons-material/Add';
import { AnimatePresence, motion } from "framer-motion";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";

export default function CreatePostModal() {
    const [display, handleDisplay] = useState(false);
    const [state, dispatch] = useFormState(registerForumPost, undefined);
    
    const { data: session } = useSession();

    if (!session) return;

    return <Fragment>
        <button 
            className="bg-indigo-300 border border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-indigo-300 transition-all duration-300"
            onClick={() => handleDisplay(true)}
        >
            <AddIcon />
        </button>

        <AnimatePresence>
            {
                display && <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0 }}
                    onClick={() => handleDisplay(false)}
                    className="bg-black/70 backdrop-blur-sm fixed h-screen w-screen top-0 left-0 flex items-center justify-center"
                >
                    <motion.form 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        action={ dispatch }
                        className="flex flex-col gap-3 bg-zinc-800 p-4 rounded-md shadow-lg md:w-1/3" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl poppins">
                            Crear un post
                        </h2>

                        <small className="text-gray-400">
                            Hola, { session?.user?.name } ¿Qué quieres compartir hoy?
                        </small>

                        {
                            state && <p className="text-sm text-red-500">
                                * { state }
                            </p>
                        }

                        <input type="hidden" name="authorId" defaultValue={ session?.user?.id } />

                        <Label
                            label="Título"
                            htmlFor="title"
                            required
                        >
                            <Input name="title" placeholder="..." />
                        </Label> 

                        <Label
                            label="Contenido"
                            htmlFor="content"
                            required
                        > 
                            <textarea 
                                className="px-4 text-sm py-2.5 flex items-center gap-3 rounded-lg focus:outline-none focus:ring-0 bg-black/30 border border-gray-600 focus:border-indigo-500"
                                name="content" 
                            ></textarea>
                        </Label>
                        
                        <button 
                            className="bg-indigo-300 border border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-indigo-300 transition-all duration-300"
                            type="submit"
                        >
                            Publicar
                        </button>
                    </motion.form>
                </motion.section>
            }
        </AnimatePresence>
    </Fragment>
}