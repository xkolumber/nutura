import { MetadataRoute } from "next";
import { GetAdminProducts } from "./lib/functionsServer";

type Route = {
  url: string;
  lastModified: string;
};

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap: Route[] = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/ako-to-funguje`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/obchod`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/obchodne-podmienky`,
      lastModified: new Date().toISOString(),
    },
  ];

  const productsPromise = GetAdminProducts().then((objects) =>
    objects.map((object) => ({
      url: `${baseUrl}/obchod/produkt/${object.slug}`,
      lastModified: new Date().toISOString(),
    }))
  );

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (await Promise.all([productsPromise])).flat();
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}
