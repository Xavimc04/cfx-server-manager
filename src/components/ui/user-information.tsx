import { auth } from "@/auth";
import Link from "next/link";

export default async function UserInformation() {
    const session = await auth();

    if(!session) return <Link href="/auth/signin">
        Login
    </Link>

    return <section className="flex items-center gap-4">
        { session?.user?.name }

        {
            session.user && session.user.image && <img 
                src={ session.user.image }
                alt=''
                className="rounded"
                width="35"
                height="35"
            />
        }
    </section>
}