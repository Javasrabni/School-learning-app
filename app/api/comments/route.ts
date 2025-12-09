// app/api/comments/route.ts
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const commentSchema = new mongoose.Schema({
  materialTitle: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const materialTitle = searchParams.get("materialTitle") || "";
    await connectDB();
    const comments = await Comment.find({ materialTitle }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(comments);
  } catch (err) {
    console.error("GET /api/comments error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { materialTitle, userId, username, comment } = await req.json();
    if (!materialTitle || !username || !comment) {
      return NextResponse.json({ success: false, message: "Invalid data" }, { status: 400 });
    }
    await connectDB();
    const newComment = new Comment({ materialTitle, userId, username, comment });
    await newComment.save();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/comments error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
