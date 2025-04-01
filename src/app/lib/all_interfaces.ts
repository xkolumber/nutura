import { CartItem } from "../counter/store";

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
  date_blog: string;
}

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
  comgate_id: string;
  comgate_status: string;
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
  price_transport: number;
  products: ProductTable[];
  psc: string;
  street: string;
  telephone_number: string;
  type_payment: string;
  type_transport: string;
  state: string;
  invoice_link: string;
}

export interface ProductTable {
  quantity: number;
  product_name: string;
  price: number;
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
  sklad: number;
  popis_produkt: string;
}

export interface IsLoadingMap {
  [key: string]: boolean;
}

export interface AdminProduct {
  id: string;
  nazov: string;
  slug: string;
}

export interface DataState {
  agreement: boolean;
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
  orderItems: ShopSectionProduct[];
  note: string;
  price: string;
  price_transport: number;
  products: CartItem[];
  psc: string;
  street: string;
  telephone_number: string;
  type_payment: string;
  type_transport: string;
}

export interface ProductFirebasePayment {
  product_name: string;
  quantity: number;
  price: number;
  id: string;
}

export type PaymentCheckResult = [FireBasePayment | null, string];
