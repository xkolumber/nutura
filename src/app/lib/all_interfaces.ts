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

export interface Product {
  title: string;
  _id: string;
  slug: {
    current: string;
  };

  _createdAt: string;
  price: string;
  photo: string;
  categories: string[];
  volume: string;
  composition: string;
  storage: string;
  recommended: string;
  number_of_injections: string;
  nutrition: Nutrition[];
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
  objem: number;
  odporucane_davkovanie: string;
  pocet_vstrekov: number;
  popis_produkt: string;
  produkt_foto: string;
  produkt_pozadie: string;
  skladovanie: string;
  slug: string;
  zlozenie: string;
}
