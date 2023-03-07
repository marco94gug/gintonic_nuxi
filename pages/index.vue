<template>
  <div class="main-section">
    <Hero :topDrinks="topDrinks.drinks" />
    <section class="home">
      <!-- <Carousel title="Top Drinks" :dataList="topDrinks.drinks" />
      <Carousel title="Most Latest" :dataList="mostLatestDrinks.drinks" /> -->
    </section>
  </div>
</template>

<script lang="ts" setup>
import Hero from "~~/components/LayoutComponent/Hero.vue";
import { useDrinksStore } from "~~/stores/drinks";

const drinkStore = useDrinksStore();
const topDrinks = drinkStore.getTopDrinks;
const mostLatestDrinks = drinkStore.getMostLatestDrinks;

definePageMeta({
  middleware: ["home-dispatch"],
});
</script>
