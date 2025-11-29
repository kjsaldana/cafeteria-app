export function formatCurrency(quantity: number) {
    return Intl.NumberFormat('es-ES', { style: "currency", currency: "EUR" }).format(quantity)
}

export function getImagePath(imagePath: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    if (imagePath.startsWith(cloudinaryBaseUrl)) {
        return imagePath
    } else {
        return `/products/${imagePath}.jpg`
    }
}