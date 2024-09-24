export interface Blog {
  title: string;
  _id: string;
  slug: {
    current: string;
  };
  _createdAt: string;
  content: any;
  photo1: string;
  content2: any;
  photo2: string;
  content3: any;
  photo3: string;
}

// export interface Product {
//   title: string;
//   _id: string;
//   slug: {
//     current: string;
//   };

//   _createdAt: string;
//   price: string;
//   photo: string;
//   categories: string[];
//   volume: string;
//   composition: string;
//   storage: string;
//   recommended: string;
//   number_of_injections: string;
//   nutrition: Nutrition[];
// }

export interface Nutrition {
  nutrient: string;
  value: string;
}

export interface PromoCode {
  id: string;
  kod: string;
  zlava: number;
}

export interface ProductFirebase {
  id: string;
  cena: number;
  kategorie: string[];
  nazov: string;
  nutricna_informacia: NutriInfo[];
  objem: number;
  odporucane_davkovanie: string;
  pocet_vstrekov: number;
  popis_produkt: string;
  produkt_foto: string;
  produkt_pozadie: string;
  sklad: number;
  slug: string;
  upozornenie: string;
  zlozenie: string;
  viditelnost: boolean;
}

interface NutriInfo {
  hodnota: string;
  nutrient: string;
  priorita: number;
}

export interface FireBasePayment {
  id: string;
  createdAt: string;
  city: string;
  country: string;
  email: string;
  invoice_name: string;
  invoice_company: string;
  invoice_ico: string;
  invoice_dic: string;
  invoice_icdph: string;
  invoice_street: string;
  invoice_city: string;
  invoice_psc: string;
  invoice_country: string;
  name: string;
  note: string;
  number_order: number;
  price: number;
  products: ProductTable[];
  psc: string;
  street: string;
  telephone_number: string;
  type_payment: string;
  state: string;
  invoice_link: string;
}

export interface ProductTable {
  quantity: number;
  product_name: string;
  price: string;
}

export interface ShopSectionProduct {
  id: string;
  cena: number;
  nazov: string;
  produkt_foto: string;
  produkt_pozadie: string;
  slug: string;
}

export interface EshopBasicProductsPlusCategory {
  cena: number;
  id: string;
  nazov: string;
  kategorie: string[];
  produkt_foto: string;
  produkt_pozadie: string;
  slug: string;
}

export interface IsLoadingMap {
  [key: string]: boolean;
}

export interface AdminProduct {
  id: string;
  nazov: string;
  slug: string;
}
