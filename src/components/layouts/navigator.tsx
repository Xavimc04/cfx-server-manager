import UserInformation from "../ui/user-information";

export default function Navigator() { 
    return <nav className="flex items-center justify-between p-3">
        <ul className="flex items-center gap-4">
            <li><a href="/">Inicio</a></li>
            <li><a href="/about">Tienda</a></li>
            <li><a href="/contact">Foro</a></li>
        </ul>

        <UserInformation />
    </nav>
}