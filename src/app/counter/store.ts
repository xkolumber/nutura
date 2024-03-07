import { create } from "zustand";

let initialData: CartItem[] = [];
if (typeof window !== "undefined" && window.localStorage) {
  initialData = JSON.parse(localStorage.getItem("cart_nutura") || "[]");
}

export interface CartItem {
  id: string;
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  itemCount: number;
  addToCart: (item: CartItem) => void;
  decreaseFromCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

const useCartStore = create<CartStore>((set, get) => ({
  cartItems: initialData,
  itemCount: initialData.reduce((acc, curr) => acc + curr.quantity, 0),

  addToCart: (item) => {
    set((state) => {
      const updatedCart = [...state.cartItems];
      const existingItemIndex = updatedCart.findIndex((i) => i.id === item.id);

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += item.quantity;
      } else {
        updatedCart.push(item);
      }

      return {
        cartItems: updatedCart,
        itemCount: updatedCart.reduce((acc, curr) => acc + curr.quantity, 0),
      };
    });

    localStorage.setItem("cart_nutura", JSON.stringify(get().cartItems));
  },

  decreaseFromCart: (id) => {
    set((state) => {
      const updatedCart = [...state.cartItems];
      const existingItemIndex = updatedCart.findIndex((i) => i.id === id);

      if (
        existingItemIndex !== -1 &&
        updatedCart[existingItemIndex].quantity > 0
      ) {
        updatedCart[existingItemIndex].quantity -= 1;
        if (updatedCart[existingItemIndex].quantity === 0) {
          updatedCart.splice(existingItemIndex, 1);
        }
      }

      return {
        cartItems: updatedCart,
        itemCount: updatedCart.reduce((acc, curr) => acc + curr.quantity, 0),
      };
    });

    localStorage.setItem("cart_nutura", JSON.stringify(get().cartItems));
  },
  removeFromCart: (id) => {
    set((state) => {
      const updatedCart = state.cartItems.filter((item) => item.id !== id);

      localStorage.setItem("cart_nutura", JSON.stringify(updatedCart));

      return {
        cartItems: updatedCart,
        itemCount: updatedCart.reduce((acc, curr) => acc + curr.quantity, 0),
      };
    });
  },
}));

export default useCartStore;
