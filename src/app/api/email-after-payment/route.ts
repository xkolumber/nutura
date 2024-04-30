import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ReactEmailSent from "../../../../emails/ReactEmailSent";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { data, number_order } = await req.json();

  const email = data.email;

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
      };
    })
  );

  try {
    const data2 = await resend.emails.send({
      from: "objednavky@nuturasprejovevitaminy.sk",
      to: ["nuturasprejovevitaminy@gmail.com", email],
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
