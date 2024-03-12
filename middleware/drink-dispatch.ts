import { useCategoryStore } from "@/stores/category";
import type { DrinkPayload } from "@/types/drinks";
import { useDrinksStore } from "@/stores/drinks";

export default defineNuxtRouteMiddleware(async (to) => {
  try {
    const drinkStore = useDrinksStore();
    const categoryStore = useCategoryStore();

    const id = to.params.id as string;

    drinkStore.stillLoading("drink", true);
    await drinkStore.loadDrink(id);
    await drinkStore.loadMostLatestDrinks();

    const drink = drinkStore.getDrink as DrinkPayload;

    await categoryStore.loadCategoryFilter(drink?.strCategory);
  } catch (error) {
    console.error("Error during loading datas", error);
  }
});
