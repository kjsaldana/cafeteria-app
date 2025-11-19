import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import prisma from "@/src/lib/prisma";
import Link from "next/link";

const searchResult = async function (searchTerm: string) {
    const products = prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: "insensitive"
            }
        },
        include: {
            category: true
        }
    })
    return products
}


export default async function SearchPage({ searchParams }: { searchParams: Promise<{ search: string }> }) {
    const { search } = await searchParams
    const products = await searchResult(search)

    return (
        <>
            <Heading>Resultado de búsqueda: {search}</Heading>
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                <Link
                    href={"/admin/products/new"}
                    className="bg-amber-400 text-white w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer rounded-lg"
                >
                    Crear producto
                </Link>
                <ProductSearchForm />
            </div>
            <ProductTable products={products} />
        </>
    )
}
