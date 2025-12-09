// app/api/progress/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Progress from "@/models/Progress";
import User from "@/models/userAccount";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json([], { status: 400 });

    await connectDB();
    const data = await Progress.find({ userId }).lean();
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/progress error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, materialTitle, subTopicIndex, score = 0, isRead = true } = body;

    if (!userId || !materialTitle || subTopicIndex === undefined) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    await connectDB();

    // Upsert progress
    const existing = await Progress.findOne({ userId, materialTitle, subTopicIndex });

    if (!existing) {
      await Progress.create({ userId, materialTitle, subTopicIndex, score, isRead });
    } else {
      // hanya update score jika lebih besar dari sebelumnya
      if (typeof score === "number" && score > existing.score) existing.score = score;
      existing.isRead = isRead || existing.isRead;
      await existing.save();
    }

    // Recompute total points for user (sum of all progress scores)
    const userProgress = await Progress.find({ userId }).lean();
    const totalPoints = userProgress.reduce((acc, p) => acc + (p.score || 0), 0);

    // Update user points & level
    const user = await User.findById(userId);
    if (user) {
      user.points = totalPoints;
      user.level = Math.floor(totalPoints / 50) + 1; // atur formula level sesuai kebutuhan
      // update badges simple example
      const badges = new Set(user.badges || []);
      if (totalPoints >= 100) badges.add("Quiz Master");
      if (userProgress.filter(p => p.isRead).length >= 10) badges.add("Materi Novice");
      user.badges = Array.from(badges);
      await user.save();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/progress error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
