// app/components/NavbarClient.tsx
"use client"
import { usePathname } from 'next/navigation'

interface Props {
    username: string | null
}

const NavbarClient = ({ username }: Props) => {
    const pathname = usePathname()
    const capitalizeWords = (str: string) => {
        return str
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
    return (
        <div>
            {pathname === "/dashboard/profil" && <p className='text-sm font-medium text-gray-700'>{capitalizeWords(username)}</p>}
        </div>
    )
}

export default NavbarClient
