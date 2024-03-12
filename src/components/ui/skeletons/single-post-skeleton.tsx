import UserInformationSkeleton from "./user-information-skeleton";

export default function SinglePostSkeleton() {
    return <section className="w-full flex flex-col gap-4">
        <UserInformationSkeleton />
        
        <div className="animate-pulse bg-zinc-800 w-1/2 h-16 rounded-md"></div>

        <div className="animate-pulse bg-zinc-800 w-1/4 h-5 rounded-md"></div>

        <div className="animate-pulse bg-zinc-800 w-full h-40 rounded-md"></div>
    </section>
}