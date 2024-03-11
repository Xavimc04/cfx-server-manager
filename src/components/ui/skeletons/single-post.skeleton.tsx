export default function SinglePostSkeleton() {
    return <section className="w-1/2 self-center flex flex-col gap-4">
        <div className="flex gap-4 items-center mb-5">
            <div className="animate-pulse bg-zinc-800 w-16 h-16 rounded-md"></div>
            
            <div className="flex-1 flex flex-col gap-2 py-1">
                <div className="animate-pulse bg-zinc-800 w-2/4 h-4 rounded-md"></div>
                <div className="animate-pulse bg-zinc-800 w-1/4 h-3 rounded-md"></div>
            </div>

            <div className="flex items-center gap-4">
                <div className="animate-pulse bg-zinc-800 w-10 h-10 rounded-md"></div>
                <div className="animate-pulse bg-zinc-800 w-10 h-10 rounded-md"></div>
            </div>
        </div>
        
        <div className="animate-pulse bg-zinc-800 w-1/2 h-16 rounded-md"></div>

        <div className="animate-pulse bg-zinc-800 w-1/4 h-5 rounded-md"></div>

        <div className="animate-pulse bg-zinc-800 w-full h-40 rounded-md"></div>
    </section>
}