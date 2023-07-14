<template>
  <div class="main container">
    <h1 class="my-4">Vår grymma meny</h1>
    <div
      class="flex flex-row justify-center gap-1 cursor-pointer after:bg-[#8b3c7f] after:h-[1px] after:w-6/12 after:mt-3 after:ml-2 before:bg-[#8b3c7f] before:h-[1px] before:w-6/12 before:mt-3 before:mr-2"
      @click="this.showFilters = !this.showFilters"
    >
      <h2
        class="font-normal text-base uppercase text-[#8b3c7f] whitespace-nowrap"
        v-html="this.showFilters ? 'Dölj filter' : 'Visa filter'"
      ></h2>
      <img
        src="../images/arrow-down.svg"
        :class="this.showFilters ? 'w-[18px] rotate-180' : 'w-[18px]'"
      />
    </div>
    <div class="flex flex-row gap-4 my-8" v-if="showFilters">
      <template v-for="(ingredient, index) in ingredients" :key="index">
        <button
          @click="setFilter(ingredient)"
          :class="
            activeFilters.includes(ingredient)
              ? 'py-2 px-4 rounded border bg-[#8b3c7f] text-white border-[#8b3c7f]'
              : 'py-2 px-4 rounded border border-[#8b3c7f]'
          "
        >
          {{ ingredient }}
        </button>
      </template>
    </div>
    <div class="flex flex-row gap-4 my-4" v-if="activeFilters.length > 0">
      <p>Aktiva filter:</p>
      <template v-for="(filter, index) in activeFilters" :key="index">
        <button @click="setFilter(filter)" class="text-[#8b3c7f] underline">
          {{ filter }} X
        </button>
      </template>
    </div>
    <h2 class="my-4" v-if="food.pizzaItems?.length > 0">Pizzas</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <template v-for="food in food.pizzaItems" :key="food.id">
        <FoodItem :food="food" />
      </template>
    </div>
    <h2 class="my-4" v-if="food.rollItems?.length > 0">Rolls</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <template v-for="food in food.rollItems" :key="food.id">
        <FoodItem :food="food" />
      </template>
    </div>
    <h2 class="my-4" v-if="food.salladItems?.length > 0">Sallad</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <template v-for="food in food.salladItems" :key="food.id">
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
      food: foodData,
      ingredients: [],
      showFilters: false,
      activeFilters: [],
    };
  },
  mounted() {
    const allIngredients = this.food.pizzaItems
      .reduce((ingredients, pizzaItem) => {
        return ingredients.concat(pizzaItem.ingredients);
      }, [])
      .concat(
        this.food.rollItems.reduce((ingredients, rollItem) => {
          return ingredients.concat(rollItem.ingredients);
        }, [])
      )
      .concat(
        this.food.salladItems.reduce((ingredients, salladItems) => {
          return ingredients.concat(salladItems.ingredients);
        }, [])
      );
    this.ingredients = [...new Set(allIngredients)];
  },
  watch: {
    activeFilters(filters) {
      this.filterMenu(filters);
    },
  },
  methods: {
    setFilter(filter) {
      if (this.activeFilters.includes(filter)) {
        this.activeFilters = this.activeFilters.filter(
          (activeFilter) => activeFilter != filter
        );
      } else {
        this.activeFilters = [...this.activeFilters, filter];
      }
    },
    filterMenu(filters) {
      const filteredFood = Object.entries(foodData).reduce(
        (acc, [category, items]) => {
          const filteredItems = items.filter((item) =>
            item.ingredients.some((ingredient) => filters.includes(ingredient))
          );
          if (filteredItems.length > 0) {
            acc[category] = filteredItems;
          }
          return acc;
        },
        {}
      );
      this.food = this.activeFilters.length > 0 ? filteredFood : foodData;
    },
  },
};
</script>
