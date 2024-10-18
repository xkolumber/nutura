import { GetAdminProducts } from "./lib/functionsServer";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const dynamic = "force-dynamic";

export default async function handler() {
  const products = await GetAdminProducts();

  const xmlContent = `
    <rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
      <channel>
        <title>My Store Products</title>
        <link>${baseUrl}</link>
        <description>A list of products from My Store</description>
        ${products
          .map(
            (product) => `
            <item>
              <g:id>${product.id}</g:id>
              <g:title>${product.nazov}</g:title>
              <g:description>${product.popis_produkt}</g:description>
              <g:link>${baseUrl}/obchod/produkt/${product.slug}</g:link>
              <g:image_link>${product.produkt_foto}</g:image_link>
              <g:price>${product.cena} EUR</g:price>
              <g:condition>new</g:condition>
            </item>
          `
          )
          .join("")}
      </channel>
    </rss>
  `;

  return new Response(xmlContent, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
