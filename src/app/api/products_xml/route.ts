import { GetAdminProducts } from "@/app/lib/functionsServer";
import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const dynamic = "force-dynamic";

function escapeXML(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const products = await GetAdminProducts();
    const xmlContent = `
      <rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
        <channel>
          <title>Produkty</title>
          <link>${baseUrl}/obchod</link>
          <description>Popis produktov</description>
          ${products
            .map(
              (product) => `
              <item>
                <g:id>${escapeXML(product.id)}</g:id>
                <g:title>${escapeXML(product.nazov)}</g:title>
                <g:description>${escapeXML(
                  product.popis_produkt
                )}</g:description>
                <g:link>${escapeXML(
                  `${baseUrl}/obchod/produkt/${product.slug}`
                )}</g:link>
                <g:image_link>${escapeXML(product.produkt_foto)}</g:image_link>
                <g:price>${escapeXML(product.cena.toString())} EUR</g:price>
                <g:condition>new</g:condition>
              </item>
            `
            )
            .join("")}
        </channel>
      </rss>
    `;

    return new NextResponse(xmlContent, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating XML:", error);
    return new NextResponse("Failed to generate XML", { status: 500 });
  }
}
