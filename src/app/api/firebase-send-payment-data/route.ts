import { app } from "@/app/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { data, date_time, number_order } = await req.json();

  const getQuantity = async (id: string) => {
    let quantity = 0;
    await Promise.all(
      data.products.map(async (order: any, index: number) => {
        if (order.id === id) {
          quantity = order.quantity;
        }
      })
    );
    return quantity;
  };

  const products_data = await Promise.all(
    data.orderItems.map(async (product: any) => {
      const quantity = await getQuantity(product.id);
      return {
        product_name: product.nazov,
        quantity: quantity,
        price: product.cena,
        id: product.id,
      };
    })
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
      psc: data.psc,
      state: "prijatá",
      secret: process.env.SECRET_KEY_FIREBASE,
      street: data.street,
      telephone_number: data.telephone_number,
      type_payment: data.type_payment,
    });

    const updateStock = async (productsData: any[]) => {
      for (const product of productsData) {
        const productRef = doc(firestore, "produkty", product.id);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
          const currentStock = productDoc.data().sklad || 0;
          const quantityOrdered = product.quantity;
          const newStock = Math.max(0, currentStock - quantityOrdered);

          await updateDoc(productRef, { sklad: newStock });
        } else {
          console.error(`Document with ID ${product.id} does not exist.`);
        }
      }
    };

    updateStock(products_data);

    return NextResponse.json(200);
  } catch (error) {
    console.error("Error adding document: ", error);
    return NextResponse.json({ error });
  }
}
