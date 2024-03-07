import { auth } from "@/auth";

export default async function UserInformation() {
    const session = await auth();

    if(!session) return <button>
        Login
    </button>

    return <section className="flex items-center gap-4">
        { session?.user?.name }

        {
            session.user && session.user.image && <img 
                src={ session.user.image }
                alt="User profile picture" 
                className="rounded"
                width="35"
                height="35"
            />
        }
    </section>
}