'use client'

import { registerForumPost } from "@/lib/data";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { useFormState } from "react-dom";
import AddIcon from '@mui/icons-material/Add';

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

        {
            display && <section 
                onClick={() => handleDisplay(false)}
                className="bg-black/70 backdrop-blur-sm fixed h-screen w-screen top-0 left-0 flex items-center justify-center"
            >
                <form 
                    action={ dispatch }
                    className="flex flex-col gap-3 bg-orange-500" 
                    onClick={(e) => e.stopPropagation()}
                >
                    {
                        state && <p>
                            { state }
                        </p>
                    }

                    <input type="hidden" name="authorId" value={ 1 } />
                    <input type="text" name="title" placeholder="Título" />
                    <textarea name="content" placeholder="Contenido"></textarea>
                    <button type="submit">Crear</button>
                </form>
            </section>
        }
    </Fragment>
} 