<template>
  <div v-if="food" class="main container">
    <NuxtLink
      to="/menupage"
      class="flex flex-row gap-1 uppercase text-[#8b3c7f]"
    >
      <img src="../images/arrow-down.svg" class="w-[15px] rotate-90" />
      Tillbaka</NuxtLink
    >
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 my-4">
      <img :src="food.imgUrl" class="max-h-[350px] w-full object-cover" />
      <div>
        <h3 class="my-1">{{ food.name }}</h3>
        <p class="my-1">{{ food.price }} kr</p>
        <div class="flex flex-row text-sm my-1">
          <span
            class="text-[#777] uppercase pr-2 after:content-['•'] after:ml-2 last:after:hidden"
            v-for="(ingredient, index) in food.ingredients"
            :key="index"
            >{{ ingredient }}</span
          >
        </div>
        <AddToCartButton :item="this.food" />
      </div>
    </div>
  </div>
</template>

<script>
import foodData from "../data/menuItems.json";
export default {
  data() {
    return {
      foodId: this.$route.query.id,
      food: null,
    };
  },
  mounted() {
    const items = foodData.pizzaItems
      .concat(foodData.rollItems)
      .concat(foodData.salladItems);

    this.food = items.find((item) => item.id.toString() === this.foodId);
  },
  methods: {},
};
</script>
