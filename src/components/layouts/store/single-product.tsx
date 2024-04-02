import { Product } from "@/types/store/_types";

export default function SingleProduct({
    product
} : {
    product: Product
}) {
    return <article className="border border-zinc-700 group hover:border-green-400 hover:bg-green-400/10 cursor-pointer select-none transition-all p-3 rounded flex items-center gap-4">
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
    </article>
}