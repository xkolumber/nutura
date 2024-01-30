import { client } from "@/app/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

async function getDataArticle(slug: string) {
  const query = `*[_type == "blog" && slug.current =="${slug}"][0]`;
  const data = await client.fetch(query);
  return data;
}

export async function POST(req: NextRequest) {
  const { slug } = await req.json();

  const articles = await getDataArticle(slug);

  return NextResponse.json(articles);
}
