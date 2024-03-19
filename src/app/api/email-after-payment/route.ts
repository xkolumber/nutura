import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ReactEmailSent from "../../../../emails/ReactEmailSent";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { data, number_order } = await req.json();

  const email = data.email;
  //   const emailHtml = EmailConfirmationPage({
  //     data,
  //     number_order,
  //   });

  try {
    const data2 = await resend.emails.send({
      from: "info@nutura.sk",
      to: [email, "info@nutura.sk"],
      subject: `Potvrdenie objednávky - ${number_order}`,
      react: ReactEmailSent({
        data,
        number_order,
      }),
    });

    return NextResponse.json(data2);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
