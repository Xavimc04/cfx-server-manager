export default function StoreProductSkeleton() {
    return <section className="self-center w-full flex flex-col gap-4">
        {
            Array.from({ length: 5 }).map((_, index) => {
                return <article key={ index } className="border border-zinc-700 self-center p-3 rounded flex flex-wrap items-center w-full gap-4">
                    <div className="h-10 w-10 bg-zinc-800 animate-pulse rounded-md"></div>
        
                    <section className="flex-1 flex flex-col gap-2 py-1">
                        <div className="h-4 bg-zinc-800 animate-pulse w-2/4"></div>
                        <div className="h-3 bg-zinc-800 animate-pulse w-1/4"></div>
                    </section>

                    <div className="h-10 w-10 bg-zinc-800 animate-pulse rounded-md"></div>

                    <div className="w-full flex justify-end">
                        <div className="h-10 w-32 bg-zinc-800 animate-pulse rounded-md"></div>
                    </div>
                </article>
            })
        }
    </section>
}