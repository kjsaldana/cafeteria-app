"use server"

import { ProductSchema } from "@/schema"
import prisma from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateProduct(data: unknown, id: number) {

    const result = ProductSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.product.update({
            where: {
                id: id
            },
            data: {
                name: result.data.name,
                price: result.data.price,
                categoryId: result.data.categoryId,
                image: result.data.image
            }
        })
        revalidatePath('/admin/products')
    } catch (error) {
        console.log(error)
    }
}