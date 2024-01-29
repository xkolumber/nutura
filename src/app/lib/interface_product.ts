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
