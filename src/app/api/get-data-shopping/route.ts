import { client } from "@/app/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

async function getDataProducts(ids: string[]) {
  const query = `
      *[_type == "product" && _id in $ids] {
        "_id": _id,
        "title": title,
        "price": price,
        "photo": photo.asset->url
      }
    `;
  const params = { ids };
  const data = await client.fetch(query, params);
  return data;
}

export async function POST(req: NextRequest) {
  const { ids } = await req.json();

  const products = await getDataProducts(ids);

  return NextResponse.json(products);
}
