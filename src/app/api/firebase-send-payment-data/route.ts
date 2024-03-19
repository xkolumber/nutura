import { app } from "@/app/firebase/config";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { data, date_time, number_order } = await req.json();

  try {
    const firestore = getFirestore(app);

    const paymentsCollection = collection(firestore, "nutura_platby");

    await addDoc(paymentsCollection, {
      agreement: data.agreement,
      createdAt: date_time,
      city: data.city,
      country: data.country,
      name: data.name,
      email: data.email,
      invoice_name: data.invoice_name,
      invoice_company: data.invoice_company,
      invoice_ico: data.invoice_ico,
      invoice_dic: data.invoice_dic,
      invoice_icdph: data.invoice_icdph,
      invoice_street: data.invoice_street,
      invoice_city: data.invoice_city,
      invoice_psc: data.invoice_psc,
      invoice_country: data.invoice_country,
      note: data.note,
      number_order: Number(number_order),
      products: data.products,
      price: Number(data.price),
      psc: data.psc,
      state: "prijatá",
      secret: process.env.SECRET_KEY_FIREBASE,
      street: data.street,
      telephone_number: data.telephone_number,
      type_payment: data.type_payment,
    });

    return NextResponse.json(200);
  } catch (error) {
    console.error("Error adding document: ", error);
    return NextResponse.json({ error });
  }
}
