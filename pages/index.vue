<template>
  <div class="main-section">
    <Hero :topDrinks="topDrinks.drinks" />
    <section class="home">
      <Carousel title="Top Drinks" :dataList="topDrinks.drinks" />
      <Carousel title="Most Latest" :dataList="mostLatestDrinks.drinks" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import Carousel from "~~/components/LayoutComponent/Carousel.vue";
import Hero from "~~/components/LayoutComponent/Hero.vue";
import { useDrinksStore } from "~~/stores/drinks";

const drinkStore = useDrinksStore();
const topDrinks = drinkStore.getTopDrinks as any;
const mostLatestDrinks = drinkStore.getMostLatestDrinks as any;

definePageMeta({
  middleware: ["home-dispatch"],
});
</script>

<style lang="scss" scoped>
.main-section {
  display: flex;
  flex-direction: column;

  .home {
    padding-block: 20px;
  }
}

@media only screen and (min-width: 768px) {
  .main-section {
    .home {
      padding: 40px 100px;
      display: flex;
      flex-direction: column;
      gap: 50px;
    }
  }
}
</style>
