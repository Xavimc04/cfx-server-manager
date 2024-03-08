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
                        className="flex flex-col gap-3 bg-white dark:bg-zinc-800 p-4 rounded-md shadow-lg w-96" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        {
                            state && <p className="text-sm text-red-500">
                                * { state }
                            </p>
                        }

                        <input type="hidden" name="authorId" value={ 1 } />

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
                            <Input name="content" placeholder="..." />
                        </Label> 

                        <button 
                            className="bg-indigo-300 border border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-indigo-300 transition-all duration-300"
                            type="submit"
                        >
                            Crear
                        </button>
                    </motion.form>
                </motion.section>
            }
        </AnimatePresence>
    </Fragment>
} 