export function formatCurrency(quantity: number) {
    return Intl.NumberFormat('es-ES', { style: "currency", currency: "EUR" }).format(quantity)
}