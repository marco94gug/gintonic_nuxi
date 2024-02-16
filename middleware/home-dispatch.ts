import { useDrinksStore } from "@/stores/drinks";

export default defineNuxtRouteMiddleware(async () => {
  const drinksStore = useDrinksStore();

  await drinksStore.loadTopDrinks();
  await drinksStore.loadMostLatestDrinks();
});
