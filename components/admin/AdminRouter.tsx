"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouterProps = {
    link: {
        url: string;
        text: string;
        blank: boolean;
    }
}

export default function AdminRouter({ link }: AdminRouterProps) {
    const pathname = usePathname()
    const isSelected = pathname.startsWith(link.url)

    return (
        <Link
            className={`font-bold text-lg border-t border-gray-200 last-of-type:border-b p-3 ${isSelected && 'bg-amber-400 text-white'}`}
            href={link.url}
            target={link.blank ? '_blank' : ''}
        >
            {link.text}
        </Link>
    )
}
