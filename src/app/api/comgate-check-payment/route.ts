import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const transIdCookie = cookies().get("transId");
  const transId = transIdCookie ? transIdCookie.value : null;

  if (transId) {
    try {
      const response = await fetch("https://payments.comgate.cz/v1.0/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          merchant: process.env.SECRET_KEY_COMGATE_MERCHANT!,
          transId: transId,
          secret: process.env.SECRET_KEY_COMGATE!,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.text();

      const statusMatch = responseData.match(/status=([^&]+)/);
      const status = statusMatch ? statusMatch[1] : null;

      return new NextResponse(status, {
        status: status === "PAID" ? 200 : 500,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } catch (error) {
      console.log("tu som error");
      console.error("Error adding document: ", error);
      return NextResponse.json({ error });
    }
  } else {
    return new NextResponse(null, {
      status: 500,
    });
  }
}
