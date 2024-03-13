import Link from "next/link";
import UserInformation from "../ui/user-information";

export default function Navigator() { 
    return <nav className="flex items-center justify-between p-3 text-white"
        style={{
            textShadow: "0 0 2px rgba(0, 0, 0, 0.5)"
        }}
    >
        <ul className="flex items-center gap-4">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/forum">Foro</Link></li>
            <li><Link href="/store">Tienda</Link></li>
        </ul>

        <UserInformation />
    </nav>
}