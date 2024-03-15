"use client"

import { cn } from "@/lib/twMerge"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function AmountSelector() {
    const elements = [5, 10, 25, 50]

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleClick = (amount: string) => {
        const params = new URLSearchParams(searchParams); 

        if (amount) {
            params.set('amount', amount);
        } else {
            params.delete('amount');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return <section
        className="flex gap-4"
    >
        {
            elements.map(element => {
                return <Item 
                    key={element.toString()}
                    onClick={() => handleClick(element.toString())} 
                    isActive={searchParams.get('amount') === element.toString()}
                >
                    {element}
                </Item>
            })
        }
    </section>
}

function Item({
    onClick,
    isActive, 
    children
} : {
    onClick: () => void,
    isActive?: boolean,
    children: React.ReactNode
}) {
    return <button 
        className={ cn('border px-5 poppins py-2 rounded transition-all', isActive ? 'border-yellow-500 text-yellow-500' : 'text-zinc-500 border-zinc-500') }
        onClick={onClick}
    >
        { children }

        <span className="text-xs">€</span>
    </button>
}