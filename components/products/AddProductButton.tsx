"use client"
import { Product } from "@/app/generated/prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({ product }: AddProductButtonProps) {
    const addToOrder = useStore(state => state.addToOrder)
    return (
        <button
            type="button"
            className="bg-amber-500 hover:bg-amber-400 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            onClick={() => addToOrder(product)}
        >
            Agregar
        </button>
    )
}
