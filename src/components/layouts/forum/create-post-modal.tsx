'use client'

import { registerForumPost } from "@/lib/data";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";

export default function CreatePostModal() {
    const [state, dispatch] = useFormState(registerForumPost, undefined);
    
    const { data: session } = useSession();

    if (!session) return;

    return <Modal
        action={ dispatch }
        title="Crear un post"
        description={`Hola, ${ session?.user?.name } ¿Qué quieres compartir hoy?`}
    >
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
    </Modal>
}