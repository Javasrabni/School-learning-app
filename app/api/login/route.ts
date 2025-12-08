import { connectDB } from "@/lib/db";
import userAccount from "@/models/userAccount";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { usernameOrEmail, password } = await req.json();
    if (!usernameOrEmail || !password) {
      return NextResponse.json(
        { success: false, message: "Email/Password tidak boleh kosong" },
        { status: 400 }
      );
    }

    const user = await userAccount.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Akun tidak ditemukan.",
      }, {status: 500});
    }

    // Cek Password
    // const comparePass = await bcrypt.compare(password, user.password);
    // if (!comparePass) {
    //   return NextResponse.json({ message: "Password salah." }, { status: 401 });
    // }

    if (user.password !== password) {
      return NextResponse.json({ message: "Password salah." }, { status: 401 });
    }

    // JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const token = await new SignJWT({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      avatar: user.avatar,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    // Validation login
    const res = NextResponse.json({
      success: true,
      message: "Login Berhasil",
      token
    });

    res.cookies.set("token", token, {
      maxAge: 60 * 60 * 24 * 2,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    
    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
