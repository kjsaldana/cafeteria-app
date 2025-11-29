"use client"
import { Category } from "@/app/generated/prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

type CategoryIconProps = {
  category: Category
}

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{ category: string }>()
  const isSelected = category.slug === params.category

  return (
    <Link
      href={`/order/${category.slug}`}
      className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b ${isSelected ? "bg-amber-400 text-white" : ""}`}
    >
      <div className="w-16 h-16 relative">
        <Image fill src={`/icon_${category.slug}.svg`} alt="Imagen categoria" />
      </div>
      <span className="text-2xl font-bold">{category.name}</span>
    </Link>
  )
}