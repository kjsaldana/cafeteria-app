import prisma from "@/src/lib/prisma"
import ImageUpload from "./ImageUpload"
import { Product } from "@/app/generated/prisma/client"

type ProductFormProps = {
    product?: Product
}

export default async function ProductForm({ product }: ProductFormProps) {
    const categories = await prisma.category.findMany()

    return (
        <>
            <div className="space-y-2">
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="block w-full p-3 bg-slate-100 rounded-md"
                    placeholder="Nombre Producto"
                    defaultValue={product?.name}
                />
            </div>

            <div className="space-y-2">
                <input
                    id="price"
                    name="price"
                    className="block w-full p-3 bg-slate-100 rounded-md"
                    placeholder="Precio Producto"
                    defaultValue={product?.price}
                />
            </div>

            <div className="space-y-2">
                <select
                    className="block w-full p-3 bg-slate-100 rounded-md"
                    id="categoryId"
                    name="categoryId"
                    defaultValue={product?.categoryId}
                >
                    <option value="" hidden>--Seleccionar--</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <ImageUpload image={product?.image} />
        </>
    )
}