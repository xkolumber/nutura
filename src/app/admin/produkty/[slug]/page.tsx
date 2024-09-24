import React, { useState } from "react";
import { auth } from "@/app/firebase/config";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import AdminHeader from "@/app/components/AdminHeader";
import { ProductFirebase } from "@/app/lib/all_interfaces";
import ProductAdmin from "@/app/components/ProductAdmin";

async function getDataProduct(slug: string): Promise<ProductFirebase | null> {
  const db = getFirestore(auth.app);
  const q = query(collection(db, "produkty"), where("slug", "==", slug));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  let selectedProduct: ProductFirebase | null = null;

  querySnapshot.forEach((doc) => {
    const data = doc.data() as ProductFirebase;
    selectedProduct = {
      ...data,
      id: doc.id,
    };
  });

  return selectedProduct;
}
const Page = async ({ params }: { params: { slug: string } }) => {
  const data = (await getDataProduct(params.slug)) as ProductFirebase;

  return (
    <>
      <ProductAdmin data={data} />
    </>
  );
};

export default Page;
