import { EmailContactPage } from "@/app/components/EmailContactPage";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { name, email, tel_number, message } = await req.json();
  const emailHtml = EmailContactPage({
    name,
    email,
    tel_number,
    message,
  });
  try {
    const data = await resend.emails.send({
      from: "objednavky@nuturasprejovevitaminy.sk",
      to: "lubosk158@gmail.com",
      subject: "Dotaz od klienta z webstránky",
      html: emailHtml,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
