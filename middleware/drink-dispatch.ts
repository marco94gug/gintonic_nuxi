import { useDrinksStore } from "~~/stores/drinks";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const drinkStore = useDrinksStore();
  const id = to.params.id as string;

  await drinkStore.loadDrink(id);
});
