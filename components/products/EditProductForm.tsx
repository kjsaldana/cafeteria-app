"use client"

import { updateProduct } from "@/actions/update-product-action"
import { ProductSchema } from "@/schema"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function EditProductForm({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const id = +params.id!

    const handleForm = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }

        const result = ProductSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.map(issue => {
                toast.error(issue.message)
            })
            return
        }

        const response = await updateProduct(result.data, id)
        if (response?.errors) {
            response.errors.map(issue => {
                toast.error(issue.message)
            })
            return
        }

        toast.success('Producto actualizado correctamente')
        router.push('/admin/products')
    }
    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-xl mx-auto">
            <form className="space-y-5" action={handleForm}>
                {children}
                <input
                    type="submit"
                    className="bg-gray-500 hover:bg-gray-400 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md"
                    value="Guardar Cambios"
                />
            </form>
        </div>
    )
}
