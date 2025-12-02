"use client"
import LatestOrderItem from "@/components/order/LatestOrderItem";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";

export default function OrdersPage() {
    const url = "/orders/api"
    const fetcher = () => fetch(url)
        .then(res => res.json())
        .then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: false
    })

    if (error) return <div>Fallo al cargar</div>
    if (isLoading) return <div>cargando...</div>
    if (data) return (
        <>
            <h1 className="text-center mt-10 text-6xl font-black">Ordenes Listas</h1>
            <Logo />
            {data.length ? (
                <div className="grid grid-cols-2 gap-5 max-w-4xl mx-auto my-10">
                    {data.map(order => (
                        <LatestOrderItem key={order.id} order={order} />
                    ))}
                </div>
            ) : <p className="text-center my-10">No hay ordenes listas</p>}
        </>
    )
}
