"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"

export default function OrderSummary() {
  const order = useStore(state => state.order)
  const total = useMemo(() => order.reduce((total, item) => total + (item.price * item.quantity), 0), [order])

  const handleSubmitForm = () => {
    createOrder()
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

          <form action={handleSubmitForm}>
            <input
              type="submit"
              value={'confirmar pedido'}
              className="mt-5 w-full bg-black hover:bg-gray-800 p-2 px-4 text-white font-bold rounded-lg uppercase cursor-pointer"
            />
          </form>
        </div>)
      }
    </aside>
  )
}