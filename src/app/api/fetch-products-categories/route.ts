import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../firebase/config";

export async function POST(req: NextRequest, res: NextResponse) {
  const { categories, id } = await req.json();
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
      let allProducts = allProductsArrays.flat();
      const uniqueProducts = allProducts.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.id === product.id)
      );
      allProducts = uniqueProducts.filter((product) => product.id !== id);
      return NextResponse.json({ allProducts });
    } catch (error) {
      return NextResponse.json({ error });
    }
  }
}
