
import { Product } from "@/app/generated/prisma/client"
import { formatCurrency } from "@/src/utils"
import Image from "next/image"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="border border-gray-200 bg-white flex flex-col h-full items-center">
            <Image height={500} width={400} src={`/products/${product.image}.jpg`} alt="Imagen de producto" />

            <div className="p-5 h-full flex flex-col justify-end">
                <h3 className="text-2xl font-bold h-full">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatCurrency(product.price)}</p>
                <button
                    type="button"
                    className="bg-amber-500 hover:bg-amber-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                >
                    Agregar
                </button>
            </div>
        </div>
    )
}
