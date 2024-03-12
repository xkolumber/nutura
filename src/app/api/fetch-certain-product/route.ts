import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../firebase/config";
import { ProductFirebase } from "@/app/lib/all_interfaces";

export async function GET(req: NextRequest, res: NextResponse) {
  const queryString = req.url.split("?")[1];
  const queryParams = new URLSearchParams(queryString);
  const slug = queryParams.get("slug");

  console.log("slug");
  console.log(slug);
  const db = getFirestore(auth.app);
  const q = query(collection(db, "produkty"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  try {
    const doc = querySnapshot.docs[0];
    const selectedProduct = {
      ...(doc.data() as ProductFirebase),
      id: doc.id,
    };
    return NextResponse.json(selectedProduct);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
