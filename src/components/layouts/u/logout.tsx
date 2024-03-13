"use client"

import { signOut } from "next-auth/react"

export default function Logout() {
    return <button 
        onClick={() => signOut()}
        className="rounded border opacity-60 p-2 flex items-center justify-center hover:opacity-100 hover:border-red-500 hover:text-red-500 transition-all"
    >
        Cerrar sesión
    </button> 
}