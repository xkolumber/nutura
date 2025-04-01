import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { data, number_order } = await req.json();

  try {
    const response = await fetch("https://payments.comgate.cz/v1.0/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        merchant: process.env.SECRET_KEY_COMGATE_MERCHANT!,
        country: "SK",
        price: (data.price * 100).toFixed(0),
        curr: "EUR",
        name: data.name,
        email: data.email,
        label: "Platba",
        refId: number_order,
        method: "ALL",
        prepareOnly: "true",
        secret: process.env.SECRET_KEY_COMGATE!,
        // test: "true",
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.text();

    return new NextResponse(responseData, {
      status: response.status,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    return NextResponse.json({ error });
  }
}
