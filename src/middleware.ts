import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const token = req.cookies.get("TokenNutura")?.value;

  const isOnAdminArea = req.nextUrl.pathname.startsWith("/admin");
  const isOnLoginArea = req.nextUrl.pathname.startsWith("/login-admin");

  if (!token && isOnAdminArea) {
    return NextResponse.redirect(new URL("/login-admin", req.url));
  }
  if (!token && isOnLoginArea) {
    return response;
  }

  try {
    const res = await fetch(`${process.env.ALLOWED_ORIGIN}/api/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const { isAdmin } = await res.json();

    if (isOnAdminArea && !isAdmin) {
      return NextResponse.redirect(new URL("/login-admin", req.url));
    }
    if (isOnLoginArea && isAdmin) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return response;
  } catch (error) {
    console.error("Error verifying token", error);
    return NextResponse.redirect(new URL("/login-admin", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/login/:path", "/login-admin/:path"],
};
