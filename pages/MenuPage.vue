<template>
  <div class="main container">
    <h1>Our awesome menu</h1>
    <h2>Pizzas</h2>
    <div class="flex flex-row gap-8">
      <template v-for="food in pizzaItems" :key="food.id">
        <FoodItem :food="food" />
      </template>
    </div>
    <h2>Rolls</h2>
    <div class="flex flex-row gap-8">
      <template v-for="food in rollItems" :key="food.id">
        <FoodItem :food="food" />
      </template>
    </div>
  </div>
</template>

<script>
import foodData from "../data/menuItems.json";
export default {
  data() {
    return {
      pizzaItems: foodData.pizzaItems,
      rollItems: foodData.rollItems,
    };
  },
};
</script>
