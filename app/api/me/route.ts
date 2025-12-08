import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie");
  const token = cookie?.split("token=")[1]?.split(";")[0];
  if (!token)
    return NextResponse.json({ message: "Tidak ada token" }, { status: 401 });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload } = await jwtVerify(token, secret);
  
  return NextResponse.json({ user: payload });
}
