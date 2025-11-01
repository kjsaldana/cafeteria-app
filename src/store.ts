import { create } from "zustand"
import { OrderItem } from "./types";
import { Product } from "@/app/generated/prisma/client";

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQty: (id: Product['id']) => void
    decreaseQty: (id: Product['id']) => void
    removeOrderItem: (id: Product['id']) => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        const { categoryId, image, ...data } = product

        let order: OrderItem[] = []

        if (get().order.find(item => item.id === data.id)) {
            order = get().order.map(item => item.id === data.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: product.price
            }]
        }

        set(() => ({
            order
        }))
    },
    increaseQty: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },
    decreaseQty: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.price * (item.quantity - 1)
            } : item)
        }))
    },
    removeOrderItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    }
}))