import { sendEmailAfterPaymentFinal } from "@/app/lib/actions";
import { checkPaymentDatabaseAndActualize } from "@/app/lib/functionsServer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { id, refId }: { id: string; refId: string } = await req.json();
  console.log(id);
  console.log(refId);

  if (id && refId) {
    try {
      const response = await fetch("https://payments.comgate.cz/v1.0/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          merchant: process.env.SECRET_KEY_COMGATE_MERCHANT!,
          transId: id,
          secret: process.env.SECRET_KEY_COMGATE!,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.text();

      const statusMatch = responseData.match(/status=([^&]+)/);
      const status = statusMatch ? statusMatch[1] : null;

      if (status === "PAID") {
        const [data, status_order] = await checkPaymentDatabaseAndActualize(
          id,
          refId
        );

        if (
          status_order === "initialize" &&
          data != null &&
          data.number_order.toString() === refId &&
          data.comgate_id === id
        ) {
          await sendEmailAfterPaymentFinal(data);
        } else {
          console.log("nerovnaju sa");
        }
      }

      return new NextResponse(status, {
        status: status === "PAID" ? 200 : 500,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      return NextResponse.json({ error });
    }
  } else {
    return new NextResponse(null, {
      status: 500,
    });
  }
}
