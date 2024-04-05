"use client"

import { useFormStatus } from "react-dom"

export default function Submit({
    children,
    className,
} : {
    children: React.ReactNode,
    className?: string,
}) {
    const status = useFormStatus();

    return <button
        disabled={ status.pending }
        type="submit"
        className={ className }
    >
        { children }
    </button>
}