"use client"

import Modal from "@/components/ui/modal";
import { buyProduct } from "@/lib/data";
import { Product } from "@/types/store/_types";
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import Submit from "../submit";

export default function SingleProduct({
    product
} : {
    product: Product
}) {
    const [state, dispatch] = useFormState(buyProduct, undefined);
    const { data: session } = useSession();

    if (!session) return;

    return <article className="border border-zinc-700 cursor-pointer select-none transition-all p-3 rounded flex items-center gap-4">
        {/* @ Image */}
        <img 
            src={ product.image || '' }
            alt=''
            className="w-20 h-20 object-cover rounded-sm"
        />
        
        {/* @ Information */}
        <section className="flex-1">
            <h2 className="poppins group-hover:text-green-400 text-xl transition-all">{ product.title }</h2>

            <p className="text-xs text-gray-600">{ product.createdAt.toDateString() }</p>

            <p className="text-md text-gray-400 mt-3">{ product.description }</p>
        </section>

        {/* @ Stats */}
        <section className="flex items-center text-3xl text-green-400 mr-3 gap-3 poppins"> 
            { product.price }€
        </section>

        {
            session && session?.user?.id && <Modal
                action={ dispatch }
                title={ product.title }
                description={ product.description }
                content={
                    <AddCardOutlinedIcon />
                }
            >
                {
                    state && <p className="text-sm text-red-500">
                        * { state }
                    </p>
                }

                <input type="hidden" name="productId" defaultValue={ String(product.id) } />
                
                <input type="hidden" name="userId" defaultValue={ session.user?.id } />

                <Submit
                    className="bg-indigo-500 hover:bg-indigo-700 transition-all text-white p-2 rounded-sm"
                >
                    Comprar
                </Submit>
            </Modal> 
        }
    </article>
}