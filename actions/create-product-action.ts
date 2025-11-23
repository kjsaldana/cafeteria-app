"use server"

import { ProductSchema } from "@/schema"
import prisma from "@/src/lib/prisma"

export async function createProduct(data: unknown) {

    const result = ProductSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.product.create({
            data: {
                name: result.data.name,
                price: result.data.price,
                categoryId: result.data.categoryId,
                image: result.data.image
            }
        })
    } catch (error) {
        console.log(error)
    }
}