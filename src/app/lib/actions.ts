"use server";

import { revalidatePath } from "next/cache";
import { firestore } from "../firebase/configServer";
import { FireBasePayment } from "./all_interfaces";
import { Resend } from "resend";
import EmailAfterPaymentFinal from "../../../emails/EmailAfterPaymentFinal";

export async function AdminDeletePromoCode(documentId: string) {
  const docRef = firestore.collection("zlavove_kody").doc(documentId);

  try {
    await docRef.delete();
    return "success";
  } catch (error) {
    console.error("Error updating product:", error);
    return "false";
  }
}

export async function AdminAddPromoCode(data: any) {
  const refCollectionRef = firestore.collection("zlavove_kody");

  try {
    await refCollectionRef.add({
      kod: data.kod,
      zlava: data.zlava,
    });
    return "success";
  } catch (error) {
    console.error("Error adding podcast:", error);
    return "false";
  }
}

export async function sendEmailAfterPaymentFinal(
  data: FireBasePayment | undefined
) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  if (data != undefined) {
    const data_sent = await resend.emails.send({
      from: "objednavky@nuturasprejovevitaminy.sk",
      to: [data.email, "nuturasprejovevitaminy@gmail.com"],
      subject: `Potvrdenie objednávky - ${data.number_order}`,
      react: EmailAfterPaymentFinal({
        data,
      }),
    });
    return data_sent;
  }
}
