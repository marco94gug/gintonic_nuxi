import { useDrinksStore } from "~~/stores/drinks";

export default defineNuxtRouteMiddleware(async (to) => {
  const drinkStore = useDrinksStore();
  const id = to.params.id as string;
  console.log("sono dentro al dispatch");
  await drinkStore.loadDrink(id);
});
