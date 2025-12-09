// app/api/leaderboard/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userAccount";

export async function GET() {
  try {
    await connectDB();
    // top 10 by points desc
    const users = await User.find().sort({ points: -1 }).limit(10).select("username points avatar").lean();
    return NextResponse.json(users);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}
