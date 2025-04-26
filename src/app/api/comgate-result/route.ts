import { sendEmailAfterPaymentFinal } from "@/app/lib/actions";
import { checkPaymentDatabaseAndActualize } from "@/app/lib/functionsServer";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.text();

  const merchantMatch = data.match(/merchant=([^&]+)/);
  const merchant = merchantMatch ? merchantMatch[1] : null;

  const secretMatch = data.match(/secret=([^&]+)/);
  const secret = secretMatch ? secretMatch[1] : null;

  const transIdMatch = data.match(/transId=([^&]+)/);
  const transId = transIdMatch ? transIdMatch[1] : null;

  const statusMatch = data.match(/status=([^&]+)/);
  const status = statusMatch ? statusMatch[1] : null;

  const refIdMatch = data.match(/refId=([^&]+)/);
  const refId = refIdMatch ? refIdMatch[1] : null;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  const allowedIP = process.env.COMGATE_IP;

  await resend.emails.send({
    from: "objednavky@nuturasprejovevitaminy.sk",
    to: ["lubosk158@gmail.com"],
    subject: `Potvgdf`,
    html: `
    <div>env comgate_ip je: ${process.env.COMGATE_IP}</div>
    <div>ip je: ${ip}</div>
    <div>merchant je: ${merchant}</div>
    <div>env merchant je: ${process.env.SECRET_KEY_COMGATE_MERCHANT}</div>
    <div>secret je: ${secret}</div>
    <div>env secret je: ${process.env.SECRET_KEY_COMGATE}</div>
    <div>sent data su: ${data}</div>
  `,
  });

  if (
    merchant === process.env.SECRET_KEY_COMGATE_MERCHANT &&
    secret === process.env.SECRET_KEY_COMGATE &&
    ip === allowedIP
  ) {
    const [data, status_order] = await checkPaymentDatabaseAndActualize(
      transId!,
      refId!,
      status!
    );

    if (data && status === "PAID") {
      await sendEmailAfterPaymentFinal(data);
    }

    return NextResponse.json(200);
  } else {
    return NextResponse.json(500);
  }
}
