import prisma from "@/src/lib/prisma"
import ImageUpload from "./ImageUpload"

export default async function ProductForm() {
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
                />
            </div>

            <div className="space-y-2">
                <input
                    id="price"
                    name="price"
                    className="block w-full p-3 bg-slate-100 rounded-md"
                    placeholder="Precio Producto"
                />
            </div>

            <div className="space-y-2">
                <select
                    className="block w-full p-3 bg-slate-100 rounded-md"
                    id="categoryId"
                    name="categoryId"
                >
                    <option value="" hidden>--Seleccionar--</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <ImageUpload />
        </>
    )
}