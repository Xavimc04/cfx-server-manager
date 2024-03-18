import { auth } from "@/auth"
import AmountSelector from "./amount-selector";
import PayPalButton from "@/components/ui/buttons/paypal";
import { getPaypalClientId } from "@/lib/paypal";

export default async function Payments() {
    const session = await auth();

    if(!session) return; 

    return <div className="flex justify-between items-center">
        <article className="flex gap-4">
            <img 
                src={ session?.user?.image || '' }
                alt=''
                className="w-20 h-20 rounded-md cursor-pointer transition-all hover:opacity-80"
            />

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl poppins cursor-pointer hover:text-indigo-500 transition-all">
                    { session?.user?.name }
                </h1>

                <p className="text-green-500 poppins text-4xl"
                    style={{
                        textShadow: '0 0 10px rgba(0, 0, 0, .7)'
                    }}
                >
                    300.000$
                </p>
            </div>
        </article>
        
        <section className="flex flex-col gap-4">
            <AmountSelector />

            <PayPalButton
                clientId={ getPaypalClientId() }
            />
        </section>
    </div>
}