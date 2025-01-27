import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ReactEmailSentOrder from "../../../../emails/ReactEmailSentOrder";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { number_order, email } = await req.json();

  try {
    const data = await resend.emails.send({
      from: "objednavky@nuturasprejovevitaminy.sk",
      to: email,
      subject: `Zaslanie objednávky - ${number_order}`,
      react: ReactEmailSentOrder({
        number_order,
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
