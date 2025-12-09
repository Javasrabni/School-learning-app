// helpers/getUserServer.ts
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/db";
import userAccount from "@/models/userAccount";

export interface User {
  _id: string;
  username: string;
  email?: string;
  [key: string]: any;
}

export const getUserServer = async (): Promise<User | null> => {
  try {
    await connectDB();

    const cookieStore = await cookies(); // synchronous di server
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    const user = await userAccount.findById(payload.id)
      .select("-password")
      .lean();

    return user || null;
  } catch (err) {
    console.error("getUserServer error:", err);
    return null;
  }
};
