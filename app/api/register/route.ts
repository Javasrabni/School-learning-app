import { connectDB } from "@/lib/db";
import userAccount from "@/models/userAccount";
import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB()
    const { username, email, password, grade } = await req.json();
    if (!username || !email || !grade || !password) {
      return NextResponse.json({success: false, message: "Username / Email / Password / Kelas tidak boleh kosong."},{ status: 400 });
    }

    const check = await userAccount.findOne({email})
    if(check) {
        return NextResponse.json({message: "Email telah terdaftar!"})
    }

    // const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new userAccount({username, email, password, grade})
    newUser.save()

    return NextResponse.json({success: true}, {status: 200})
  } catch (error) {
    console.error(error)
    return NextResponse.json({message: "Gagal dalam mendaftar akun"}, {status: 500})
  }
}
