import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import SignedPage from "@/components/signedPage/SignedPage"

export default async function Dashboard() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    // Kalau belum login, redirect balik ke home (onboarding)
    if (!token) {
        redirect("/")
    }

    // Kalau sudah login, tampilkan aplikasi
    return (
        <div className="p-8 relative">
            <SignedPage />
        </div>
    )
}