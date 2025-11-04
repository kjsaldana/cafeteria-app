"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {
  const order = useStore(state => state.order)
  const total = useMemo(() => order.reduce((total, item) => total + (item.price * item.quantity), 0), [order])

  const handleCreateOrder = async (formData: FormData) => {

    const data = {
      name: formData.get('name')
    }

    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message)
      })
      return
    }

    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach(issue => {
        toast.error(issue.message)
      })
    }
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? <p className="text-center my-10">Comienza a elegir tu comida favorita!</p> :
        (<div className="mt-5">
          {order.map(item => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <p className="text-2xl mt-20 text-center">Total a pagar: <span className="font-bold">{formatCurrency(total)}</span></p>

          <form action={handleCreateOrder} className="mt-10 w-full space-y-5">
            <input type="text" name="name" placeholder="Tu nombre" className="w-full p-2 bg-white border border-gray-400 rounded-lg" />
            <input
              type="submit"
              value={'confirmar pedido'}
              className="w-full bg-black hover:bg-gray-800 py-2 text-white font-bold rounded-lg uppercase cursor-pointer"
            />
          </form>
        </div>)
      }
    </aside>
  )
}