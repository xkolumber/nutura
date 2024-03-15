import { EshopBasicProducts } from "@/app/components/HomePageProducts";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../firebase/config";

export async function GET(req: NextRequest, res: NextResponse) {
  const queryString = req.url.split("?")[1];
  const queryParams = new URLSearchParams(queryString);
  const category = queryParams.get("category");

  const db = getFirestore(auth.app);

  const q = query(
    collection(db, "produkty"),
    where("kategorie", "array-contains-any", [category])
  );
  const querySnapshot = await getDocs(q);

  try {
    const allData: EshopBasicProducts[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      nazov: doc.data().nazov,
      cena: doc.data().cena,
      produkt_foto: doc.data().produkt_foto,
      produkt_pozadie: doc.data().produkt_pozadie,
      slug: doc.data().slug,
    }));

    return NextResponse.json(allData);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
