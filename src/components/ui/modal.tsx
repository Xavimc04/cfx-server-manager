'use client'

import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({
    action, 
    title, 
    description, 
    children
} : {
    action: any,
    title: string,
    description: string, 
    children: React.ReactNode
}) {
    const [display, handleDisplay] = useState(false);
    
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
                    className="bg-black/70 backdrop-blur-sm fixed h-screen w-screen top-0 left-0 flex items-center z-80 justify-center"
                >
                    <motion.form 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        action={ action }
                        className="flex flex-col gap-3 bg-zinc-800 p-4 rounded-md shadow-lg md:w-1/3" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl poppins">
                            { title }
                        </h2>

                        <small className="text-gray-400">
                            { description }
                        </small>

                        { children }
                    </motion.form>
                </motion.section>
            }
        </AnimatePresence>
    </Fragment>
}