import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-center">
            <Heading>Producto no encontrado!</Heading>
            <Link
                href={'/admin/products'}
                className="bg-amber-400 text-white px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto hover:bg-amber-300"
            >
                Ir a productos
            </Link>
        </div>
    )
}
