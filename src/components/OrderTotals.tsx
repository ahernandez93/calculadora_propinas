import { useMemo } from "react"
import type { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
    order: OrderItem[]
    tip: number
    placeOrder: () => void
}

export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {

    const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.price * item.quantity), 0), [order])
    const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order])
    const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order])

    return (
        <>
            <div className="space-y-3">
                <h2 className="text-2xl font-black">Totales y Propinas:</h2>
                <p>Subtotal a pagar: <span className="font-black">{formatCurrency(subtotalAmount)}</span></p>
                <p>Propina: <span className="font-black">{formatCurrency(tipAmount)}</span></p>
                <p>Total a pagar: <span className="font-black">{formatCurrency(totalAmount)}</span></p>
            </div>

            <button
                className="w-full bg-black p-3 uppercase text-white font-black mt-10 disabled:opacity-10"
                disabled={totalAmount === 0}
                onClick={placeOrder}
            >
                Guardar Orden
            </button>
        </>
    )
}
