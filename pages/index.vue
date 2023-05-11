<template>
  <div class="main-section">
    <Hero :topDrinks="topDrinks" />
    <section class="home">
      <Carousel title="Top Drinks" :dataList="topDrinks" />
      <Carousel title="Most Latest" :dataList="mostLatestDrinks" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import Carousel from "~~/components/LayoutComponent/Carousel.vue";
import Hero from "~~/components/LayoutComponent/Hero.vue";
import { useDrinksStore } from "~~/stores/drinks";

const drinkStore = useDrinksStore();
const topDrinks = drinkStore.getTopDrinks;
const mostLatestDrinks = drinkStore.getMostLatestDrinks;

definePageMeta({
  middleware: ["home-dispatch"],
});
</script>

<style lang="scss" scoped>
@import "../styles/utils";
.main-section {
  display: flex;
  flex-direction: column;

  .home {
    padding-block: 20px;
    padding-inline: 15px;
  }
}

@media only screen and (min-width: 768px) {
  .main-section {
    .home {
      padding: 40px 0;
      margin: auto;
      max-width: 720px;
      display: flex;
      flex-direction: column;
      gap: 50px;

      @include start-from("desktop") {
        max-width: 980px;
      }
      @include start-from("desktop-large") {
        max-width: 1220px;
      }
      @include start-from("desktop-extralarge") {
        max-width: 1440px;
      }
    }
  }
}
</style>
