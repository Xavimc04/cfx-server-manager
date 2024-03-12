"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import CreatePostModal from "./create-post-modal";

export default function QueryFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return <section className="self-center flex -mt-20 z-20 items-center gap-4 w-full">
        <input 
            className="bg-zinc-800 px-4 border border-zinc-700 shadow-lg flex-1 py-2 rounded-md focus:outline-none focus:ring-0"
            placeholder="Buscar..."
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get('query')?.toString()}
        />

        <CreatePostModal />
    </section>
}