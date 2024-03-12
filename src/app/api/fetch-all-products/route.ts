import { EshopBasicProducts } from "@/app/components/HomePageProducts";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../firebase/config";

export async function GET(req: NextRequest, res: NextResponse) {
  const db = getFirestore(auth.app);
  const produktyCollectionRef = collection(db, "produkty");

  try {
    const querySnapshot = await getDocs(produktyCollectionRef);

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
