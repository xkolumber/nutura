import { app } from "@/app/firebase/config";
import { DataState, ProductFirebasePayment } from "@/app/lib/all_interfaces";
import { updateStock } from "@/app/lib/functionsServer";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { data, date_time, number_order, status, id_comgate } =
    (await req.json()) as {
      data: DataState;
      date_time: string;
      number_order: number;
      status: string;
      id_comgate: string;
    };

  const getQuantity = (id: string) => {
    let quantity = 0;

    data.products.map((item: any) => {
      if (item.id === id) {
        quantity = item.quantity;
      }
    });

    return quantity;
  };

  const products_data: ProductFirebasePayment[] = data.orderItems.map(
    (product: any) => {
      const quantity = getQuantity(product.id);
      return {
        product_name: product.nazov,
        quantity: quantity,
        price: Number(product.cena),
        id: product.id,
      };
    }
  );

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
      comgate_id: id_comgate,
      comgate_status: status,
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
      products: products_data,
      price: Number(data.price),
      price_transport: Number(data.price_transport),
      psc: data.psc,
      state: "prijatá",
      secret: process.env.SECRET_KEY_FIREBASE,
      street: data.street,
      telephone_number: data.telephone_number,
      type_payment: data.type_payment,
      type_transport: data.type_transport,
    });

    updateStock(products_data);

    return NextResponse.json(200);
  } catch (error) {
    console.error("Error adding document: ", error);
    return NextResponse.json({ error });
  }
}
