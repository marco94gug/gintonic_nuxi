import { useDrinksStore } from "~~/stores/drinks";

export default defineNuxtRouteMiddleware(async (to) => {
  const drinkStore = useDrinksStore();
  const id = to.params.id as string;

  drinkStore.stillLoading("drink", true);
  await drinkStore.loadDrink(id);
});
