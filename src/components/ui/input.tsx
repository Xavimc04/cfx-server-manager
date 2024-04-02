'use client'

import { cn } from "@/lib/twMerge"
import { InputProps } from "@/types/ui/input/_types"

export default function Input(props: InputProps) {
    return <input 
        type={props.type || 'text'} 
        placeholder={props.placeholder} 
        className={cn(
            "px-4 text-sm py-2.5 flex items-center gap-3 rounded-lg placeholder:text-gray-600 focus:outline-none focus:ring-0 bg-black/30 border border-gray-600 transition-all focus:border-indigo-500", 
            props.className
        )} 
        onChange={props.onChange} 
        value={props.value} 
        required={props.required} 
        disabled={props.disabled} 
        autoComplete={props.autoComplete} 
        autoFocus={props.autoFocus} 
        id={props.id} 
        name={props.name} 
        onBlur={props.onBlur}
        onFocus={props.onFocus}
    />
}