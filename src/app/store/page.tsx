import Payments from "@/components/layouts/store/payments";

export default async function Page() {
    return <section className="self-center z-20 px-5 w-full lg:px-0 lg:w-1/2 xl:w-2/4 -mt-24 flex flex-col gap-10">
        {/* @ Alert */}
        <p className="border p-4 rounded border-red-400 text-red-400 bg-red-400/20">
            Recuerda que los pagos no son reembolsables.
        </p>

        {/* @ Payment */}
        <Payments />
    </section>
}