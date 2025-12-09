// app/api/avatar/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userAccount";

export async function POST(req: Request) {
  try {
    const { userId, avatar } = await req.json();
    if (!userId || !avatar) return NextResponse.json({ success: false }, { status: 400 });
    await connectDB();
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ success: false }, { status: 404 });
    user.avatar = avatar;
    await user.save();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
