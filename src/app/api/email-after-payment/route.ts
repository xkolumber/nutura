import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ReactEmailSent from "../../../../emails/ReactEmailSent";
import { ProductFirebasePayment } from "@/app/lib/all_interfaces";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { data, number_order } = await req.json();

  const email = data.email;

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
        price: product.cena,
        price_discount: product.cena_zlava,
        id: product.id,
        discount: product.zlava,
      };
    }
  );

  try {
    const data2 = await resend.emails.send({
      from: "objednavky@nuturasprejovevitaminy.sk",
      to: ["info@nuturasprejovevitaminy.sk", email],
      subject: `Potvrdenie objednávky - ${number_order}`,
      react: ReactEmailSent({
        data,
        number_order,
        products_data,
      }),
    });

    return NextResponse.json(data2);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
