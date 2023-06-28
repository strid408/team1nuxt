<template>
  <div>
    <NuxtLink :to="`/foodpage?id=${food.id}`">
      <img :src="food.imgUrl" />
      <h3>{{ food.name }}</h3>
      <p>{{ food.price }} kr</p>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: ["food"],
};
</script>
