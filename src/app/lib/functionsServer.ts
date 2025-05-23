"use server";
import { firestore } from "../firebase/configServer";

import { revalidatePath } from "next/cache";
import {
  AdminProduct,
  EshopBasicProductsPlusCategory,
  FireBasePayment,
  PaymentCheckResult,
  ProductFirebase,
  ProductFirebasePayment,
  PromoCode,
} from "./all_interfaces";
import { client } from "./sanity";

export async function GetAdminProducts(): Promise<ProductFirebase[]> {
  const orderCollectionRef = firestore
    .collection("produkty")
    .where("viditelnost", "==", true);

  try {
    const querySnapshot = await orderCollectionRef.get();

    if (querySnapshot.empty) {
      return [];
    }

    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data() as Omit<ProductFirebase, "id">;
      return {
        ...docData,
        id: doc.id,
      } as ProductFirebase;
    });

    return data;
  } catch (error) {
    console.error("Database Error: Failed to fetch products.", error);
    return [];
  }
}

export async function GetAdminProductsOrder(): Promise<ProductFirebase[]> {
  const orderCollectionRef = firestore
    .collection("produkty")
    .where("viditelnost", "==", true)
    .orderBy("sklad", "desc");

  try {
    const querySnapshot = await orderCollectionRef.get();

    if (querySnapshot.empty) {
      return [];
    }

    let data = querySnapshot.docs.map((doc) => {
      const docData = doc.data() as Omit<ProductFirebase, "id">;
      return {
        ...docData,
        id: doc.id,
      } as ProductFirebase;
    });

    data = data.sort((a, b) => {
      if (a.zlava === b.zlava) return 0;
      if (a.zlava) return -1;
      return 1;
    });

    return data;
  } catch (error) {
    console.error("Database Error: Failed to fetch products.", error);
    return [];
  }
}

export async function GetAdminProductsCategory(category: string) {
  const orderCollectionRef = firestore
    .collection("produkty")
    .where("viditelnost", "==", true)
    .orderBy("sklad", "desc");

  try {
    const querySnapshot = await orderCollectionRef
      .where("kategorie", "array-contains-any", [category])
      .get();

    if (querySnapshot.empty) {
      return [];
    }

    let data = querySnapshot.docs.map((doc) => {
      const docData = doc.data() as Omit<ProductFirebase, "id">;
      return {
        ...docData,
        id: doc.id,
      } as ProductFirebase;
    });

    data = data.sort((a, b) => {
      if (a.zlava === b.zlava) return 0;
      if (a.zlava) return -1;
      return 1;
    });

    return data;
  } catch (error) {
    console.error("Database Error: Failed to fetch orders.", error);
    return [];
  }
}

export async function GetAdminCertainProduct(slug: string) {
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
}

export async function GetAdminProductsCategories(
  categories: string[],
  excludeId?: string
) {
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
            cena_zlava: doc.data().cena_zlava,
            id: doc.id,
            nazov: doc.data().nazov,
            kategorie: doc.data().kategorie,
            produkt_foto: doc.data().produkt_foto,
            produkt_pozadie: doc.data().produkt_pozadie,
            slug: doc.data().slug,
            sklad: doc.data().sklad,
            popis_produkt: doc.data().popis_produkt,
            zlava: doc.data().zlava,
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
}

export async function getDataBlog(slug: string) {
  const query = `*[_type == "blog" && slug.current =="${slug}"][0]`;
  const data = await client.fetch(query);
  return data;
}

export async function getBlogs() {
  const query = `*[_type == "blog"] | order(_createdAt desc)`;
  const data = await client.fetch(query);
  return data;
}

export async function getLatestBlog() {
  const query = `*[_type == "blog"] | order(_createdAt desc)[0]`;
  const data = await client.fetch(query);
  return data;
}

export async function doRevalidate(pathname: string) {
  revalidatePath(pathname);
}

export async function GetPayments() {
  const orderCollectionRef = firestore.collection("nutura_platby");
  try {
    const querySnapshot = await orderCollectionRef
      .where("state", "==", "prijatá")
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

    const sortedOrders = receivedOrders.sort(
      (a, b) => b.number_order - a.number_order
    );

    return sortedOrders;
  } catch (error) {
    console.error("Database Error: Failed to fetch the latest podcast.", error);
    throw new Error("Database Error: Failed to fetch the latest podcast.");
  }
}

export async function GetAdminPromoCodes() {
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
}

export async function GetAdminPromoCodesNoCache() {
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
}

export async function GetAdminProductsLessNoCache() {
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
}

export async function GetAdminProductIdNoCache(id: string) {
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
}

export async function getLastNumberOrder() {
  try {
    const numberCollectionRef = firestore.collection(
      "cislo_poslednej_objednavky"
    );
    const querySnapshot = await numberCollectionRef.get();

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const docSnapshot = await docRef.get();
      const currentData = docSnapshot.data();
      const currentOrderNumber = currentData?.cislo_objednavky || 0;
      const newOrderNumber = currentOrderNumber + 1;
      await docRef.update({ cislo_objednavky: newOrderNumber });
      return newOrderNumber;
    } else {
      throw new Error("Number document not found");
    }
  } catch (error) {
    console.error("Error fetching order number:", error);
    throw error;
  }
}

export async function updateStock(productsData: ProductFirebasePayment[]) {
  for (const product of productsData) {
    const productRef = firestore.collection("produkty").doc(product.id);

    const productDoc = await productRef.get();
    if (productDoc.exists) {
      const currentStock = productDoc.data()?.sklad || 0;
      const quantityOrdered = product.quantity;
      const newStock = Math.max(0, currentStock - quantityOrdered);

      await productRef.update({ sklad: newStock });
    } else {
      console.error(`Document with ID ${product.id} does not exist.`);
    }
  }
}

export async function checkPaymentDatabaseAndActualize(
  id: string,
  refId: string,
  status: string
): Promise<PaymentCheckResult> {
  const conceptDocRef = firestore.collection("nutura_platby");

  try {
    const querySnapshot = await conceptDocRef
      .where("comgate_id", "==", id)
      .where("number_order", "==", parseInt(refId))
      .get();

    if (querySnapshot.empty) {
      return [null, ""];
    }
    const doc = querySnapshot.docs[0];

    const products_data = doc.data() as FireBasePayment;

    const docRef = querySnapshot.docs[0].ref;

    if (
      products_data.comgate_status === "initialize" &&
      products_data.number_order.toString() === refId &&
      products_data.comgate_id === id
    ) {
      await docRef.update({ comgate_status: status.toLowerCase() });
    }

    return [products_data, products_data.comgate_status];
  } catch (error) {
    return [null, ""];
  }
}

export async function GetAdminPayment(id: string) {
  try {
    const docRef = firestore.collection("nutura_platby").doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      console.error("Document not found.");
      return undefined;
    }
    const data = docSnapshot.data();

    if (!data) {
      console.error("Document data is undefined.");
      return undefined;
    }

    const dataGallery: FireBasePayment = {
      ...data,
      id: docSnapshot.id,
    } as FireBasePayment;

    return dataGallery;
  } catch (error) {
    return undefined;
  }
}
