import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import HomeWrapper from "@/components/Home/HomeWrapper"

export default async function Home() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    // Kalau sudah login, PAKSA redirect ke dashboard
    if (token) {
        redirect("/dashboard")
    }

    // Kalau belum login, tampilkan onboarding
    return <HomeWrapper />
}