import PayPalButton from "@/components/ui/buttons/paypal";
import { getPaypalClientId } from "@/lib/paypal";

export default async function Page() {
    return <section className="self-center z-20 px-5 w-full lg:px-0 lg:w-1/2 xl:w-2/4">
        Online store with paypal integration

        <PayPalButton 
            clientId={ getPaypalClientId() }
        />
    </section>
}