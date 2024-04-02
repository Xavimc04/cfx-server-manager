import { getFilteredProducts } from "@/lib/data"
import { Product } from "@prisma/client"
import SingleProduct from "./single-product"

export default async function ProductList({
    query
} : {
    query: string
}) {
    const products: Product[] = await getFilteredProducts(query)

    return <section className="flex flex-col gap-4 self-center w-full">
        {
            products.map((product: Product) => {
                return <SingleProduct 
                    key={ product.id }
                    product={ product }
                />
            })
        }
    </section>
}