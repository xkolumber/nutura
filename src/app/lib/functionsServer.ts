"use server";
import { firestore } from "../firebase/configServer";

import { revalidatePath, unstable_cache, unstable_noStore } from "next/cache";
import {
  AdminProduct,
  EshopBasicProductsPlusCategory,
  FireBasePayment,
  ProductFirebase,
  PromoCode,
} from "./all_interfaces";
import { client } from "./sanity";

export const GetAdminProducts = unstable_cache(
  async () => {
    const orderCollectionRef = firestore
      .collection("produkty")
      .where("viditelnost", "==", true);

    try {
      const querySnapshot = await orderCollectionRef.get();

      if (querySnapshot.empty) {
        return [];
      }

      const data: EshopBasicProductsPlusCategory[] = querySnapshot.docs.map(
        (doc) => {
          return {
            cena: doc.data().cena,
            id: doc.id,
            nazov: doc.data().nazov,
            kategorie: doc.data().kategorie,
            produkt_foto: doc.data().produkt_foto,
            produkt_pozadie: doc.data().produkt_pozadie,
            slug: doc.data().slug,
          };
        }
      );

      return data;
    } catch (error) {
      console.error("Database Error: Failed to fetch orders.", error);
      return [];
    }
  },
  ["GetAdminProducts"],
  { revalidate: 60 }
);

export const GetAdminProductsCategory = unstable_cache(
  async (category: string) => {
    const orderCollectionRef = firestore
      .collection("produkty")
      .where("viditelnost", "==", true);

    try {
      const querySnapshot = await orderCollectionRef
        .where("kategorie", "array-contains-any", [category])
        .get();

      if (querySnapshot.empty) {
        return [];
      }

      const data: EshopBasicProductsPlusCategory[] = querySnapshot.docs.map(
        (doc) => {
          return {
            cena: doc.data().cena,
            id: doc.id,
            nazov: doc.data().nazov,
            kategorie: doc.data().kategorie,
            produkt_foto: doc.data().produkt_foto,
            produkt_pozadie: doc.data().produkt_pozadie,
            slug: doc.data().slug,
          };
        }
      );

      return data;
    } catch (error) {
      console.error("Database Error: Failed to fetch orders.", error);
      return [];
    }
  },
  [`GetAdminProductsCategory`],
  { revalidate: 60 }
);

export const GetAdminCertainProduct = unstable_cache(
  async (slug: string) => {
    const orderCollectionRef = firestore.collection("produkty");

    try {
      const querySnapshot = await orderCollectionRef
        .where("slug", "==", slug)
        .get();

      if (querySnapshot.empty) {
        return null;
      }
      const doc = querySnapshot.docs[0];
      const selectedProduct = {
        ...(doc.data() as ProductFirebase),
        id: doc.id,
      };

      return selectedProduct;
    } catch (error) {
      console.error("Database Error: Failed to fetch orders.", error);
      return null;
    }
  },
  [`GetAdminCertainProduct`],
  { revalidate: 60 }
);

export const GetAdminProductsCategories = unstable_cache(
  async (categories: string[], excludeId?: string) => {
    const orderCollectionRef = firestore
      .collection("produkty")
      .where("viditelnost", "==", true);
    try {
      const allProductsPromises = categories.map(async (category: string) => {
        const querySnapshot = await orderCollectionRef
          .where("kategorie", "array-contains", category)
          .get();

        if (querySnapshot.empty) {
          return [];
        }
        const data: EshopBasicProductsPlusCategory[] = querySnapshot.docs.map(
          (doc) => {
            return {
              cena: doc.data().cena,
              id: doc.id,
              nazov: doc.data().nazov,
              kategorie: doc.data().kategorie,
              produkt_foto: doc.data().produkt_foto,
              produkt_pozadie: doc.data().produkt_pozadie,
              slug: doc.data().slug,
            };
          }
        );

        return data;
      });
      const allProductsArrays = await Promise.all(allProductsPromises);
      let allProducts = allProductsArrays.flat();

      const uniqueProducts = allProducts.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.id === product.id)
      );

      if (excludeId) {
        allProducts = uniqueProducts.filter(
          (product) => product.id !== excludeId
        );
      } else {
        allProducts = uniqueProducts;
      }

      return allProducts;
    } catch (error) {
      console.error("Database Error: Failed to fetch products.", error);
      return [];
    }
  },
  [`GetAdminProductsCategories`],
  { revalidate: 60 }
);

export async function getDataBlog(slug: string) {
  const query = `*[_type == "blog" && slug.current =="${slug}"][0]`;
  const data = await client.fetch(query);
  return data;
}

export async function doRevalidate(pathname: string) {
  revalidatePath(pathname);
}

export async function GetPayments() {
  unstable_noStore();

  const orderCollectionRef = firestore.collection("nutura_platby");

  try {
    const querySnapshot = await orderCollectionRef
      .where("state", "==", "prijatá")
      .orderBy("number_order", "desc")
      .get();

    if (querySnapshot.empty) {
      return [];
    }

    const receivedOrders: FireBasePayment[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as FireBasePayment;
      const order: FireBasePayment = {
        ...data,
        id: doc.id,
      };
      receivedOrders.push(order);
    });
    return receivedOrders;
  } catch (error) {
    console.error("Database Error: Failed to fetch the latest podcast.", error);
    throw new Error("Database Error: Failed to fetch the latest podcast.");
  }
}

export const GetAdminPromoCodes = unstable_cache(
  async () => {
    const orderCollectionRef = firestore.collection("zlavove_kody");

    try {
      const querySnapshot = await orderCollectionRef.get();

      if (querySnapshot.empty) {
        return [];
      }
      const paymentData: PromoCode[] = [];
      querySnapshot.forEach((doc) => {
        const promoData = doc.data() as PromoCode;
        const promoId = doc.id;
        const promoWithId: PromoCode = { ...promoData, id: promoId };
        paymentData.push(promoWithId);
      });

      return paymentData;
    } catch (error) {
      console.error("Database Error: Failed to fetch orders.", error);
      return [];
    }
  },
  [`GetAdminPromoCodes`],
  { revalidate: 60 }
);

export const GetAdminProductsLess = unstable_cache(
  async () => {
    const orderCollectionRef = firestore.collection("produkty");

    try {
      const querySnapshot = await orderCollectionRef.get();

      if (querySnapshot.empty) {
        return [];
      }
      const data: AdminProduct[] = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          nazov: doc.data().nazov,
          slug: doc.data().slug,
        };
      });

      return data;
    } catch (error) {
      console.error("Database Error: Failed to fetch orders.", error);
      return [];
    }
  },
  [`GetAdminProductsLess`],
  { revalidate: 60 }
);

export const GetAdminProductId = unstable_cache(
  async (id: string) => {
    unstable_noStore();
    const orderCollectionRef = firestore.collection("produkty").doc(id);
    const docSnapshot = await orderCollectionRef.get();

    if (!docSnapshot.exists) {
      return undefined;
    }

    const data = docSnapshot.data() as ProductFirebase;
    const podcastWithId = {
      ...data,
      id: docSnapshot.id,
    };

    return podcastWithId;
  },
  [`GetAdminProductId`],
  { revalidate: 60 }
);
