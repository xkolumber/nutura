import { client } from "@/app/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

async function getArticles() {
  const query = `*[_type == "blog"]`;
  const data = await client.fetch(query);
  return data;
}

export async function GET() {
  const articles = await getArticles();

  return NextResponse.json(articles);
}
