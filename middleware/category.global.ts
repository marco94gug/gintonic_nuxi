import { useCategoryStore } from "@/stores/category";

export default defineNuxtRouteMiddleware(async () => {
  const categoryStore = useCategoryStore();

  await categoryStore.load();
});
