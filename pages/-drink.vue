<template>
  <main v-if="!drinksStore.isDrinkLoading">
    <Hero :drinkInfo="drink" />
    <Breadcrumbs
      :links="[drink?.strCategory as string, drink?.strDrink as string]"
      @OnClickLink="categoryClick"
    />
    <section class="drink_main-content"></section>
  </main>
  <main v-else>sto caricando...</main>
</template>

<script lang="ts" setup>
import { buildUrlPath } from "~~/services/url";
import { useDrinksStore } from "~~/stores/drinks";
import { drinkType } from "~~/types/drinks";
import Hero from "~~/components/LayoutComponent/Hero.vue";

const drinksStore = useDrinksStore();
const drink = drinksStore.getDrink as drinkType;
const router = useRouter();

watchEffect(() => {
  if (drinksStore.drink?.strDrink) {
    drinksStore.stillLoading("drink", false);
  }
});

definePageMeta({
  middleware: ["drink-dispatch"],
});

//Methods
const categoryClick = (link: string) => {
  router.push({
    name: "search-page",
    query: { category: buildUrlPath(link) },
  });
};
</script>
