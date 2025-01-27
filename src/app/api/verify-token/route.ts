import { auth } from "@/app/firebase/configServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    const decodedToken = await auth.verifySessionCookie(token, true);

    if (decodedToken.email_verified === false) {
      return NextResponse.json({ isAdmin: false, error: "Invalid token" });
    }

    if (decodedToken.isAdmin) {
      return NextResponse.json({ isAdmin: true });
    }

    return NextResponse.json({ isAdmin: false });
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json({ isAdmin: false, error: "Invalid token" });
  }
}
