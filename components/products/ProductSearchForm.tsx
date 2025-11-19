"use client"
import { SearchSchema } from "@/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function ProductSearchForm() {
  const router = useRouter()

  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get('search')
    }

    const result = SearchSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.map(issue => {
        toast.error(issue.message)
        return
      })
    } else {
      router.push(`/admin/products/search?search=${result.data.search}`)
    }
  }

  return (
    <form className="flex items-center lg:gap-5" action={handleSearchForm}>
      <input type="text" placeholder="Buscar Producto" className="p-2 placeholder-gray-400 w-full bg-white" name="search" />
      <input type="submit" className="bg-amber-400 p-2 uppercase text-white cursor-pointer rounded-lg" value={"buscar"} />
    </form>
  )
}
