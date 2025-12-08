"use client"
import { useUser } from "@/context/userDataCookie"
import SplashOnboarding from "@/components/splashOrOnboardingScreen/splashOnboarding"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomeWrapper() {
    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (user) {
            router.push("/dashboard")
        }
    }, [user, router])

    return (
        <div className="p-8 relative">
            <SplashOnboarding />
        </div>
    )
}