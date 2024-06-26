'use client'

import { registerStoreProduct } from "@/lib/data";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Submit from "../submit";

export default function CreateProductModal() {
    const [state, dispatch] = useFormState(registerStoreProduct, undefined);
    const [imageUrl, handleImageUrl] = useState<string | null>(null);

    const { data: session } = useSession();

    if (!session || !session.user?.id || !session.user.role || String(session.user.role) != 'ADMIN') return;

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

        <Label
            label="Categoria"
            htmlFor="ingame_category"
            required
        >
            <select
                name="ingame_category"
                className="px-4 text-sm py-3 flex items-center gap-3 rounded-lg placeholder:text-gray-600 focus:outline-none focus:ring-0 bg-black/30 border border-gray-600 transition-all focus:border-indigo-500"
            >
                <option value=""></option>
                <option value="money">Dinero en banco</option>
                <option value="vip">Moneda VIP</option>
                <option value="weapon">Arma</option>
            </select>
        </Label>

        <Label
            label="Valor ingame"
            htmlFor="ingame_value"
            required
        >
            <Input name="ingame_value" placeholder="weapon_pistol, weapon_shotgun, 3 (monedas vip o efectivo)" />
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

        <Submit
            className="bg-indigo-300 border border-indigo-500 text-indigo-500 p-2 rounded-md hover:bg-indigo-500 hover:text-indigo-300 transition-all duration-300"
        >
            Publicar
        </Submit>
    </Modal>
}