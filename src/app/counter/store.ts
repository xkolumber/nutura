import { create } from "zustand";

let initialData: Record<string, number> = {};
if (typeof window !== "undefined" && window.localStorage) {
  initialData = JSON.parse(localStorage.getItem("cart") || "{}");
}

interface CartStore {
  cartItems: Record<string, number>;
  itemCount: number;
  addToCart: (item: string) => void;
  removeFromCart: (item: string) => void;
}

const useCartStore = create<CartStore>((set, get) => ({
  cartItems: initialData,
  itemCount: Object.values(initialData).reduce((acc, curr) => acc + curr, 0),

  addToCart: (item) => {
    set((state) => {
      const updatedCart = { ...state.cartItems };
      updatedCart[item] = (updatedCart[item] || 0) + 1;

      return {
        cartItems: updatedCart,
        itemCount: Object.values(updatedCart).reduce(
          (acc, curr) => acc + curr,
          0
        ),
      };
    });

    localStorage.setItem("cart", JSON.stringify(get().cartItems));
  },

  removeFromCart: (item) => {
    set((state) => {
      const updatedCart = { ...state.cartItems };
      if (updatedCart[item] && updatedCart[item] > 0) {
        updatedCart[item] -= 1;
      }

      return {
        cartItems: updatedCart,
        itemCount: Object.values(updatedCart).reduce(
          (acc, curr) => acc + curr,
          0
        ),
      };
    });
    console.log("called");

    localStorage.setItem("cart", JSON.stringify(get().cartItems));
  },
}));

export default useCartStore;
