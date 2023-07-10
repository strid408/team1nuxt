<template>
  <div>
    <NuxtLink :to="`/foodpage?id=${food.id}`">
      <img :src="food.imgUrl" class="max-h-[250px] w-full object-cover" />
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
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: ["food"],
};
</script>
