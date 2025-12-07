import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const {email, password, grade} = await req.json()
    if(!email || !password || !grade) {
        return NextResponse.json({success: false, message: "Email / Password / Kelas tidak boleh kosong."}, {status: 400})
    }
    
}