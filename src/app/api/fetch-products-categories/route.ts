import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../firebase/config";
import { ProductFirebase, ShopSectionProduct } from "@/app/lib/all_interfaces";
import { collectGenerateParams } from "next/dist/build/utils";

export async function POST(req: NextRequest, res: NextResponse) {
  const { categories } = await req.json();

  console.log("categories");
  console.log(categories);
  const db = getFirestore(auth.app);

  if (categories != undefined) {
    const allProductsPromises = categories.map(async (category: string) => {
      const q = query(
        collection(db, "produkty"),
        where("kategorie", "array-contains", category)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        cena: doc.data().cena,
        nazov: doc.data().nazov,
        produkt_foto: doc.data().produkt_foto,
        produkt_pozadie: doc.data().produkt_pozadie,
        slug: doc.data().slug,
      }));
    });

    try {
      const allProductsArrays = await Promise.all(allProductsPromises);
      const allProducts = allProductsArrays.flat(); // Flatten the array of arrays into a single array

      console.log(allProducts);
      return NextResponse.json({ allProducts });
    } catch (error) {
      return NextResponse.json({ error });
    }
  }
}
