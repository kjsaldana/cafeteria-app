import { useStore } from "@/src/store"
import { OrderItem } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"

type ProductDetailsProps = {
    item: OrderItem
}

const MAX_QTY = 10
const MIN_QTY = 1

export default function ProductDetails({ item }: ProductDetailsProps) {
    const increaseQty = useStore(state => state.increaseQty)
    const decreaseQty = useStore(state => state.decreaseQty)
    const disableIncreaseButton = useMemo(() => item.quantity === MAX_QTY, [item])
    const disableDecreaseButton = useMemo(() => item.quantity === MIN_QTY, [item])
    const removeOrderItem = useStore(state => state.removeOrderItem)

    return (
        <div className="shadow space-y-1 p-4 bg-white border-b border-gray-300 last-of-type:border-b-0">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{item.name} </p>
                    <button type="button" onClick={() => removeOrderItem(item.id)}>
                        <XCircleIcon className="text-red-600 h-8 w-8 cursor-pointer" />
                    </button>
                </div>

                <p className="text-2xl text-amber-500 font-black">{formatCurrency(item.price)}</p>

                <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                    <button
                        type="button"
                        onClick={() => decreaseQty(item.id)}
                        className="cursor-pointer disabled:opacity-20 disabled:cursor-auto"
                        disabled={disableDecreaseButton}
                    >
                        <MinusIcon className="h-6 w-6" />
                    </button>
                    <p className="text-lg font-black ">{item.quantity}</p>
                    <button
                        type="button"
                        onClick={() => increaseQty(item.id)}
                        className="cursor-pointer disabled:opacity-20 disabled:cursor-auto"
                        disabled={disableIncreaseButton}
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </div>

                <p className="text-xl font-black text-gray-700">
                    Subtotal: {''}
                    <span className="font-normal">
                        {formatCurrency(item.subtotal)}
                    </span>
                </p>
            </div>
        </div>
    )
}
