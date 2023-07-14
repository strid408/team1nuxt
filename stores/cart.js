// stores/counter.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    return { cartItems: [] };
  },
  actions: {
    add(item) {
      if (!this.cartItems.includes(item)) {
        this.cartItems = [...this.cartItems, item];
      }
    },
    remove(id) {
      this.cartItems = this.cartItems.filter((cartItem) => cartItem.id != id);
    },
    clear() {
      this.cartItems = [];
    },
  },
});
