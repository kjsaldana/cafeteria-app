"use server"

import { OrderIdSchema } from "@/schema"
import prisma from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"

export async function completeOrder(formData: FormData) {
    const data = {
        orderId: formData.get('order_id')
    }

    const result = OrderIdSchema.safeParse(data)

    if (result.success) {
        try {
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })
            revalidatePath('/amin/products')
        } catch (error) {
            console.log(error)
        }
    }
}