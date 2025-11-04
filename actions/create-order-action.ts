"use server"

import { OrderSchema } from "@/schema"

export async function createOrder(data: unknown) {
    const result = OrderSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }
}