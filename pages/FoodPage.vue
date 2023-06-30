<template>
  <div v-if="food" class="main container">
    <img :src="food.imgUrl" />
    <h3>{{ food.name }}</h3>
    <p>{{ food.price }} kr</p>
    <ul>
      <li v-for="(ingredient, index) in food.ingredients" :key="index">
        {{ ingredient }}
      </li>
    </ul>
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
    const items = foodData.pizzaItems.concat(foodData.rollItems);

    this.food = items.find((item) => item.id.toString() === this.foodId);
  },
  methods: {},
};
</script>
