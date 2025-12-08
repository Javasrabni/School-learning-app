"use client"
import {  useRouter } from "next/navigation"
import HomeWrapper from "@/components/Home/HomeWrapper"
import { useEffect, useState } from "react"
import { getToken } from "@/utils/storage"

export default function Home() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const checkLogin = async ()=> {
            const token = await getToken()
            if(token) {
                router.replace('/dashboard')
            } else {
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    if(loading) return null; //Loading 

    return <HomeWrapper />
}