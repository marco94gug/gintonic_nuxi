<template>
  <main v-if="!drinksStore.isDrinkLoading">
    <Hero :drinkInfo="drink" />
    <Breadcrumbs
      :links="[drink?.strCategory as string, drink?.strDrink as string]"
      @OnClickLink="categoryClick"
    />
    <section class="drink_main-content">
      <Ingredients />
    </section>
  </main>
  <main v-else>sto caricando...</main>
</template>

<script lang="ts" setup>
import { buildUrlPath } from "~~/services/url";
import { useDrinksStore } from "~~/stores/drinks";
import Hero from "~~/components/LayoutComponent/Hero.vue";
import Ingredients from "~/components/LayoutComponent/Ingredients.vue";
import { DrinkPayload } from "~/types/drinks";

const drinksStore = useDrinksStore();
const drink = drinksStore.getDrink as DrinkPayload;
const router = useRouter();

watchEffect(() => {
  if (drink?.strDrink) {
    drinksStore.stillLoading("drink", false);
  }
});

definePageMeta({
  middleware: ["drink-dispatch"],
});

//Methods
const categoryClick = (link: string | undefined): void => {
  router.push({
    name: "search-page",
    query: { category: buildUrlPath(link) },
  });
};
</script>

<style lang="scss" scoped>
@import "~/styles/utils";

main {
  margin: auto;
  @include start-from("desktop") {
    max-width: 860px;
  }
  @include start-from("desktop-large") {
    max-width: 1240px;
  }
  @include start-from("desktop-extralarge") {
    max-width: 1440px;
  }
}
</style>
