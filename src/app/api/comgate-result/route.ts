import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.text();

  const merchantMatch = data.match(/merchant=([^&]+)/);
  const merchant = merchantMatch ? merchantMatch[1] : null;

  const secretMatch = data.match(/secret=([^&]+)/);
  const secret = secretMatch ? secretMatch[1] : null;

  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    req.ip;

  const allowedIP = process.env.COMGATE_IP;

  if (
    merchant === process.env.SECRET_KEY_COMGATE_MERCHANT &&
    secret === process.env.SECRET_KEY_COMGATE &&
    ip === allowedIP
  ) {
    return NextResponse.json(200);
  } else {
    return NextResponse.json(500);
  }
}
