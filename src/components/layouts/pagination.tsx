"use client"

import { usePathname, useSearchParams } from "next/navigation"; 

import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import Link from "next/link";

export default function Pagination({
    currentPage,
    totalPages
} : {
    currentPage: number,
    totalPages: number
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname(); 

    const createPageURL = (pageNumber: number | string) => {
        pageNumber = Number(pageNumber);

        if(pageNumber < 1) return;

        if(pageNumber > totalPages) return;

        const params = new URLSearchParams(searchParams);
        
        params.set('page', pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    };

    return <section className="flex justify-center gap-2">
        {
            (currentPage - 1) > 0 && <Link
                className="px-5 py-1 bg-zinc-900 text-white flex items-center gap-2 cursor-pointer hover:text-indigo-500 transition-all"
                href={ createPageURL(currentPage - 1) || "" }
            >
                <KeyboardDoubleArrowLeftOutlinedIcon />

                Anterior
            </Link>
        }

        {
            (currentPage + 1) <= totalPages && <Link
                href={ createPageURL(currentPage + 1) || "" }
                className="px-5 py-1 bg-zinc-900 text-white flex items-center gap-2 cursor-pointer hover:text-indigo-500 transition-all"
            >
                Siguiente
                
                <KeyboardDoubleArrowRightOutlinedIcon />
            </Link>
        }
    </section>
}