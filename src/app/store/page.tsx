import Search from "@/components/layouts/search";
import CreateProductModal from "@/components/layouts/store/create-product-modal";
import Payments from "@/components/layouts/store/payments";
import ProductList from "@/components/layouts/store/product-list";
import StoreProductSkeleton from "@/components/ui/skeletons/store-product-skeleton";
import { Suspense } from "react";

export default async function Page({
    searchParams
} : {
    searchParams?: {
        query?: string
    }
}) {
    const query = searchParams?.query || '';

    return <section className="self-center z-20 px-5 w-full lg:px-0 lg:w-1/2 xl:w-2/4 -mt-24 flex flex-col gap-10">
        {/* @ Alert */}
        <p className="border p-4 rounded border-red-400 text-red-400 bg-red-400/20">
            Recuerda que los pagos no son reembolsables.
        </p>

        {/* @ Payment */}
        <Payments />

        {/* @ Filter and register new products */}
        <section className="self-center flex z-20 items-center gap-4 w-full">
            <Search />

            <CreateProductModal />
        </section>

        {/* @ Render products */}
        <Suspense
            fallback={ <StoreProductSkeleton /> }
        >
            <ProductList 
                query={ query }
            />
        </Suspense>
    </section>
}