import { Product } from "@/app/generated/prisma/client"
import { formatCurrency, getImagePath } from "@/src/utils"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const imagePath = getImagePath(product.image)

    return (
        <div className="border border-gray-200 bg-white flex flex-col h-full items-center rounded-lg">
            <Image height={500} width={400} src={imagePath} alt="Imagen de producto" />

            <div className="p-5 h-full flex flex-col justify-end w-full text-center">
                <h3 className="text-xl font-black h-full">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatCurrency(product.price)}</p>
                <AddProductButton product={product} />
            </div>
        </div>
    )
}