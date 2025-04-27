import { ShopSectionProduct } from "./all_interfaces";

export const getTime = (time: string) => {
  const createdAtDate = new Date(time);
  const hour = createdAtDate.getHours().toString().padStart(2, "0");
  const minute = createdAtDate.getMinutes().toString().padStart(2, "0");
  const second = createdAtDate.getSeconds().toString().padStart(2, "0");
  const formattedTime = `${hour}:${minute}:${second}`;
  return formattedTime;
};

export const categories = ["prijatá", "expedovaná", "storno"];

export const getDate = (time: string) => {
  const createdAtDate = new Date(time);

  const day = createdAtDate.getDate();
  const month = createdAtDate.getMonth() + 1;
  const year = createdAtDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export function getFormatedDate(data: string) {
  const date = new Date(data);
  const day = date.getDate().toString().padStart(2, "0");
  const monthNumber = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = ` ${day}.${monthNumber}.${year}`;

  return formattedDate;
}

export function createSlug(title: string): string {
  const slug = title
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

  return slug;
}

export const stripHtmlTags = (html: string): string => {
  return html.replace(/<\/?[^>]+(>|$)/g, "").trim();
};

export const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

export const getPriceFirebase = (
  products: ShopSectionProduct[],
  id: string
): string => {
  const product = products.find((item) => item.id === id);
  return product ? product.cena.toFixed(2) : "";
};

export const getBackgroundFirebase = (
  products: ShopSectionProduct[],
  id: string
): string => {
  const product = products.find((item) => item.id === id);
  return product ? product.produkt_pozadie : "";
};

export const getPhotoFromFirebase = (
  products: ShopSectionProduct[],
  id: string
): string => {
  const product = products.find((item) => item.id === id);
  return product ? product.produkt_foto : "";
};
export const getTitleFromFirebase = (
  products: ShopSectionProduct[],
  id: string
): string => {
  const product = products.find((item) => item.id === id);
  return product ? product.nazov : "";
};

export const getSlugFromFirebase = (
  products: ShopSectionProduct[],
  id: string
): string => {
  const product = products.find((item) => item.id === id);
  return product ? product.slug : "";
};
