'use client'

import { registerStoreProduct } from "@/lib/data";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function CreateProductModal() {
    const [state, dispatch] = useFormState(registerStoreProduct, undefined);
    const [imageUrl, handleImageUrl] = useState<string | null>(null);

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
            <Input name="price" placeholder="5.00" type="number" />
        </Label>

        <input
            name="image"
            className="hidden"
            value={ imageUrl || '' }
            readOnly
        />

        {
            imageUrl ? <img src={ imageUrl } className="w-48 self-center rounded" /> : <CldUploadWidget
                uploadPreset="server_manager"
                onSuccess={({ info } : any) => {
                    if(info.url) handleImageUrl(info.url)
                }}
            >
                {
                    ({ open }) => {
                        return <button
                            onClick={() => open()}
                            className="border-dotted border-2 border-gray-700 p-5 rounded text-gray-500 my-3"
                        >
                            Subir imagen
                        </button>
                    }
                }
            </CldUploadWidget>
        }
        
        <button 
            className="bg-indigo-300 border border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-indigo-300 transition-all duration-300"
            type="submit"
        >
            Publicar
        </button>
    </Modal>
}