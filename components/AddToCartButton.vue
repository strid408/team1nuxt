<template>
  <button
    @click="cart.add(item)"
    class="bg-[#8b3c7f] text-white px-4 py-3 rounded"
  >
    Lägg i varukorgen
  </button>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();
</script>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
