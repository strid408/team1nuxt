<template>
  <div class="main container">
    <h1 class="my-4">Kundvagn</h1>
    <div
      v-if="cart.cartItems.length > 0 && !showFormSuccess"
      class="grid grid-cols-12 gap-8"
    >
      <div class="col-span-7">
        <h2>Din beställning</h2>
        <div
          v-for="item in cart.cartItems"
          :key="item.id"
          class="flex flex-row gap-8 py-4 border-b border-[#8b3c7f] last:border-b-0 first:border-t"
        >
          <NuxtLink :to="`/foodpage?id=${item.id}`">
            <img :src="item.imgUrl" class="w-[220px] h-[120px] object-cover" />
          </NuxtLink>
          <div>
            <h3 class="my-1">{{ item.name }}</h3>
            <p class="my-1">{{ item.price }} kr</p>
            <div class="flex flex-row text-sm my-1">
              <span
                class="text-[#777] uppercase pr-2 after:content-['•'] after:ml-2 last:after:hidden"
                v-for="(ingredient, index) in item.ingredients"
                :key="index"
                >{{ ingredient }}</span
              >
            </div>
          </div>
          <div class="ml-auto flex flex-col justify-center">
            <button
              @click="cart.remove(item.id)"
              class="bg-[#8b3c7f] text-white py-2 px-4 rounded-sm flex flex-row gap-2 transition-all duration-100 ease-linear hover:bg-[#571d4e]"
            >
              Ta bort
              <img src="../images/trash.svg" class="w-[16px]" />
            </button>
          </div>
        </div>
        <div class="my-4 text-2xl text-right">
          Ditt totala pris: <span class="font-bold">{{ totalPrice }} kr</span>
        </div>
      </div>

      <div class="col-span-5 pl-6">
        <h2 class="my-4">Dina uppgifter</h2>
        <form class="flex flex-col" id="cartForm" @submit.prevent="sendEmail()">
          <label>Namn <span class="text-red-600">*</span></label>
          <input
            type="text"
            v-model="name"
            name="name"
            placeholder="Namn"
            required
          />
          <label>E-post <span class="text-red-600">*</span></label>
          <input
            type="email"
            v-model="email"
            name="email"
            placeholder="Din e-post"
            required
          />
          <label>Meddelande till restaurangen</label>
          <textarea
            name="message"
            v-model="message"
            cols="30"
            rows="5"
            placeholder="Skriv ditt meddelande här..."
          >
          </textarea>
          <input type="submit" value="Beställ" />
          <!-- Hidden inputs, to be sent into formData -->
          <input type="hidden" v-model="totalPrice" name="totalPrice" />
          <textarea
            hidden
            name="cartItems"
            v-model="cartItemsText"
            cols="30"
            rows="5"
          ></textarea>
        </form>
        <p v-if="showFormError" class="text-red-700">
          Hoppsan! Något gick fel. Vänligen försök igen eller kontakta
          restaurangen.
        </p>
      </div>
    </div>
    <p class="my-8" v-if="cart.cartItems.length === 0 && !showFormSuccess">
      Din kundvagn är tom :(
    </p>
    <div v-if="showFormSuccess" class="my-8 text-center">
      <h3>Tack för din beställning!</h3>
      <p>
        Du ska ha fått en e-postbekräftelse med information om din beställning.
        Kontakta restaurangen om du har några frågor.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { ref, watch, computed } from "vue";
import emailjs from "emailjs-com";

const config = useRuntimeConfig();
const cart = useCartStore();
const totalPrice = ref(0);
const name = ref("");
const email = ref("");
const message = ref("");
const showFormError = ref(false);
const cartItems = ref(cart.cartItems);
const showFormSuccess = ref(false);

watch(
  () => cart.cartItems,
  (newCartItems) => {
    cartItems.value = newCartItems;
    getTotalPrice();
  },
  { immediate: true }
);

function getTotalPrice() {
  const prices = cartItems.value.map((item) => item.price);
  const total = prices.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  totalPrice.value = total;
}

const cartItemsText = computed(() => {
  return cartItems.value
    .map((item) => `${item.name} - ${item.price} kr`)
    .join("\n");
});
const sendEmail = () => {
  emailjs
    .sendForm(
      config.public.serviceId,
      config.public.templateId,
      "#cartForm",
      config.public.userId
    )
    .then(
      () => {
        // Reset form field
        name.value = "";
        email.value = "";
        message.value = "";
        cart.clear();
        showFormSuccess.value = true;
      },
      (error) => {
        console.log(error);
        showFormError.value = true;
      }
    );
};
</script>
