import { useCategoryStore } from "~/stores/category";
import { DrinkPayload } from "~/types/drinks";
import { useDrinksStore } from "~~/stores/drinks";

export default defineNuxtRouteMiddleware(async (to) => {
  const drinkStore = useDrinksStore();
  const categoryStore = useCategoryStore();

  const id = to.params.id as string;

  drinkStore.stillLoading("drink", true);
  await drinkStore.loadDrink(id);
  await drinkStore.loadMostLatestDrinks();

  const drink = drinkStore.getDrink as DrinkPayload;

  await categoryStore.loadCategoryFilter(drink?.strCategory);
});
