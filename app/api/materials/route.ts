// app/api/materials/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import materials from "@/models/Material";

export async function GET() {
  try {
    await connectDB();
    const material = await materials.find().lean();
    return NextResponse.json(material);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}
