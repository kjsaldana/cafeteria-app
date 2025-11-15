import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import prisma from "@/src/lib/prisma"
import { redirect } from "next/navigation";


async function productsCount() {
    return await prisma.product.count()
}

async function getProducts(currentPage: number, pageSize: number) {
    const skip = (currentPage - 1) * pageSize

    const products = await prisma.product.findMany({
        take: pageSize,
        skip: skip,
        include: {
            category: true
        }
    })
    return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>
export type SearchParams = { searchParams: Promise<{ page: string }> }


export default async function productsPage({ searchParams }: SearchParams) {
    const { page } = await searchParams
    const currentPage = +page || 1
    const pageSize = 10

    if (currentPage < 1) redirect('/admin/products')

    const products = await getProducts(currentPage, pageSize)
    const totalProducts = await productsCount()
    const totalPages = Math.ceil(totalProducts / pageSize)

    if (currentPage > totalPages) redirect('/admin/products')

    return (
        <>
            <Heading>Administrar Productos</Heading>
            <ProductTable products={products} />
            <ProductsPagination page={currentPage} totalPages={totalPages} />
        </>
    )
}