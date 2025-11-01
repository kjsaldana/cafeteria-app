import ProductCard from "@/components/products/ProductCard"
import prisma from "@/src/lib/prisma"

type OrderPageProps = {
    params: Promise<{ category: string }>
}

async function getProducts(category: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: category
            }
        }
    })
    return products
}

export default async function OrderPage({ params }: OrderPageProps) {
    const { category } = await params
    const products = await getProducts(category)

    return (
        <>
            <h1 className="text-2xl font-semibold pb-8 pt-4">Elige y personaliza tu pedido a continuación!</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}