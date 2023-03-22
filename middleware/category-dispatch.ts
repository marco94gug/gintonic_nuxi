import { useCategoryStore } from "~~/stores/category";

export default defineNuxtRouteMiddleware(async (to) => {
  const categoryStore = useCategoryStore();
  try {
    if (to.query.category) {
      const categoryName = (to.query.category as string).replace("-", "/");
      await categoryStore.loadCategoryFilter(categoryName);
    } else {
      const searchValue = to.query.text as string;
      await categoryStore.loadSearchResultedForPage(searchValue);
    }
  } catch (error) {
    console.log("test");
    console.error(error);
  }
});
