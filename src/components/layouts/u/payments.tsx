import { auth } from "@/auth"
import { getUserPurchases } from "@/lib/data"
import { cn } from "@/lib/twMerge";
import { Purchase } from "@/types/store/_types";

export default async function Payments() {
    const session = await auth();
    const purchases = await getUserPurchases(Number(session?.user?.id));

    return <section className="flex flex-col gap-2">
        <h2 className="text-2xl poppins text-white">
            Historial de compras
        </h2>

        <p className="text-sm text-gray-400">
            Aquí puedes ver todas tus compras realizadas
        </p>

        <div className="relative overflow-x-auto mt-5 -z-10">
                <table className="w-full text-sm text-left text-white rounded">
                    <thead className="text-xs text-zinc-900 uppercase bg-zinc-800 rounded font-extralight">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Producto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Código
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Estado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha de compra
                            </th>
                        </tr> 
                    </thead>

                    <tbody>
                        {
                            purchases.map((purchase: Purchase, index: number) => {
                                return <tr className="border-b border-zinc-700" key={ index }>
                                    <td className="px-6 py-4 text-ellipsis truncate">
                                        { String(purchase.id) }
                                    </td>

                                    <td className="px-6 py-4 text-ellipsis truncate">
                                        { purchase.product.title }
                                    </td>

                                    <td className="px-6 py-4 text-ellipsis truncate">
                                        { purchase.code }
                                    </td>

                                    <td className="px-6 py-4 text-ellipsis truncate">
                                        <span className={ cn('lowercase px-2 py-1 rounded border', purchase.status == 'pending' ? 'bg-blue-500/10 border-blue-500 text-blue-500' : 'bg-green-500/20 border-green-500 text-green-500') }>
                                            { purchase.status == 'pending' ? 'disponible' : 'reclamado' }
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-ellipsis truncate">
                                        { purchase.createdAt.toDateString() }
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>  
    </section>
}