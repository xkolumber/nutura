import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const cookie1 = serialize("TokenNutura", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: -1,
  });

  return NextResponse.json(
    { success: true },
    {
      headers: {
        "Set-Cookie": `${cookie1}`,
      },
    }
  );
}
