import { cn } from "@/lib/twMerge"

export default function Counter({
    count,
    children
}: {
    count: number,
    children: React.ReactNode
}) {
    const randomColors = ["text-blue-400", "text-yellow-500", "text-emerald-400", "text-red-400", "text-green-500", "text-orange-500", "text-indigo-400", "text-pink-500", "text-purple-400", "text-cyan-400", "text-rose-500", "text-lime-500"];

    return <article className="flex gap-3 items-end">
        <h3 className={ cn('text-5xl poppins', randomColors[Math.floor(Math.random() * randomColors.length)]) }>
            { count }
        </h3>

        { children }
    </article>
}