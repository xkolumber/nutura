"use server";

import { revalidatePath } from "next/cache";
import { firestore } from "../firebase/configServer";

export async function AdminDeletePromoCode(documentId: string) {
  const docRef = firestore.collection("zlavove_kody").doc(documentId);

  try {
    await docRef.delete();
    revalidatePath("/admin/zlavove_kody");
    return "success";
  } catch (error) {
    console.error("Error updating product:", error);
    return "false";
  }
}

export async function AdminAddPromoCode(data: any) {
  const refCollectionRef = firestore.collection("zlavove_kody");

  try {
    await refCollectionRef.add({
      kod: data.kod,
      zlava: data.zlava,
    });
    revalidatePath("/admin/zlavove_kody");
    return "success";
  } catch (error) {
    console.error("Error adding podcast:", error);
    return "false";
  }
}
