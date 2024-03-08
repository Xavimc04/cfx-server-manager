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

    return <section className="absolute bottom-0 self-center flex items-center gap-4 w-full px-5 md:px-0 md:w-1/2 xl:w-1/3">
        <input 
            className="bg-gray-50 dark:bg-zinc-800 px-4 border dark:border-zinc-700 shadow-lg flex-1 py-2 rounded-md focus:outline-none focus:ring-0"
            placeholder="Buscar..."
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get('query')?.toString()}
        />

        <CreatePostModal />
    </section>
}