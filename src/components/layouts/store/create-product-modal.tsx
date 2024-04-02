'use client'

import { registerForumPost } from "@/lib/data";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useRef } from "react";

export default function CreateProductModal() {
    const [state, dispatch] = useFormState(registerForumPost, undefined);
    const imageRef = useRef(null);
    
    const { data: session } = useSession();

    if (!session) return;

    return <Modal
        action={ dispatch }
        title="Crear producto"
        description={`Por favor, rellena todos los campos para crear un producto`}
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
            <Input name="description" placeholder="Contenido del producto, se lo más descriptivo posible" />
        </Label>

        <Label
            label="Precio"
            htmlFor="price"
            required
        >
            <Input name="price" placeholder="5.99" type="number" />
        </Label>

        <Label
            label="Imagen"
            htmlFor="image"
            required
        >
            <input type="file" name="image" className="hidden" ref={ imageRef } />
        </Label>
        
        <button 
            className="bg-indigo-300 border border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-indigo-300 transition-all duration-300"
            type="submit"
        >
            Publicar
        </button>
    </Modal>
}