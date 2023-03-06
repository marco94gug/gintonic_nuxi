import { useDrinksStore } from "~~/stores/drinks";

export default defineNuxtRouteMiddleware(async (from) => {
  const drinkStore = useDrinksStore();
  const id = from.params.id as string;

  await drinkStore.loadDrink(id);
});
