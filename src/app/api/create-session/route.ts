import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/firebase/configServer";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    const decodedToken = await auth.verifyIdToken(idToken);
    const userUid = decodedToken.uid;

    let isAdminValue = false;

    const allowedUids = [process.env.ADMIN_UID];
    if (!allowedUids.includes(userUid)) {
      await auth.setCustomUserClaims(userUid, {
        isAdmin: false,
      });
    } else {
      isAdminValue = true;
      await auth.setCustomUserClaims(userUid, {
        isAdmin: true,
      });
    }

    const expiresIn = 60 * 60 * 24 * 14 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    const cookie = serialize("TokenNutura", sessionCookie, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: expiresIn / 1000,
    });

    return NextResponse.json(
      { isAdmin: isAdminValue },
      { headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    console.error("Error creating session cookie:", error);
    return NextResponse.json(
      { error: "Failed to create session cookie." },
      { status: 500 }
    );
  }
}
