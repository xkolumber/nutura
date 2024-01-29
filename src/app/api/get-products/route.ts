import { client } from "@/app/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

async function getProductsByCategory(selectedCategory: string) {
  const query = `*[_type == "product" && "${selectedCategory}" in categories]`;
  const data = await client.fetch(query);
  return data;
}

async function getAllProducts() {
  const query = `*[_type == "product"]`;
  const data = await client.fetch(query);
  return data;
}

export async function POST(req: NextRequest) {
  const { selectedCategory } = await req.json();

  if (selectedCategory === "") {
    const products = await getAllProducts();
    return NextResponse.json(products);
  }

  const products = await getProductsByCategory(selectedCategory);

  return NextResponse.json(products);
}
