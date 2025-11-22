"use client"

import { ProductSchema } from "@/schema"
import { toast } from "react-toastify"

export default function AddProductForm({ children }: { children: React.ReactNode }) {
    const handleForm = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId')
        }
        const result = ProductSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.map(issue => {
                toast.error(issue.message)
            })
            return
        }
        console.log(result.data)
    }
    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-xl mx-auto">
            <form className="space-y-5" action={handleForm}>
                {children}
                <input
                    type="submit"
                    className="bg-gray-500 hover:bg-gray-400 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer  rounded-md"
                    value="Registrar producto"
                />
            </form>
        </div>
    )
}
