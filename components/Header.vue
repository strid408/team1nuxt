<template>
  <div class="p-6 bg-[#8b3c7f]">
    <ul
      class="flex flex-row text-white items-center text-lg uppercase container gap-8"
    >
      <li>
        <NuxtLink to="/"
          ><img src="../images/logo.png" class="max-w-[160px]"
        /></NuxtLink>
      </li>
      <li><NuxtLink to="/">Start</NuxtLink></li>
      <li><NuxtLink to="/menupage">Vår meny</NuxtLink></li>
      <li><NuxtLink to="/contactpage">Kontakt</NuxtLink></li>
      <li class="ml-auto">
        <NuxtLink to="/cart" class="flex flex-row items-center gap-2">
          <img class="w-[22px]" src="../images/cart.svg" />
          <span
            class="flex items-center justify-center bg-white w-[20px] h-[20px] text-center rounded-full text-[#8b3c7f] text-xs font-bold"
            >{{ cart.cartItems.length }}</span
          >
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();
</script>
