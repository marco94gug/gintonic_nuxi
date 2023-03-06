import { defineStore } from "pinia";
import { CategoryListType, CategoryResponse } from "~~/types/category";

export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      categoryList: {},
      filteredByCategory: {},
      drinksResults: {},
    } as CategoryListType;
  },

  getters: {
    getCategoryList: (state) => state.categoryList,
    getFilteredByCaategory: (state) => state.filteredByCategory,
    getDrinksResults: (state) => state.drinksResults,
  },

  actions: {
    // Mutations
    clearCategoryStore() {
      this.$reset();
    },

    //Actions
    async load() {
      const config = useRuntimeConfig();
      try {
        const res = await useFetch("list.php", {
          baseURL: config.public.apiFreeBase,
          params: {
            c: "list",
          },
        });

        const categoryRes = res.data.value as CategoryResponse;
        this.categoryList = categoryRes;
      } catch (error) {
        console.error(error);
      }
    },

    async loadCategoryFilter(category: string) {
      try {
        const res = await useRapidFetch("filter.php", {
          params: {
            c: category,
          },
        });

        const drinkListFilteredByCategory = res.data.value;
        this.filteredByCategory = drinkListFilteredByCategory;
      } catch (error) {
        console.error(error);
      }
    },

    async loadSearchResultedForPage(query: string) {
      try {
        const res = await useRapidFetch("search.php", {
          params: {
            s: query,
          },
        });

        const results = res.data.value;
        this.drinksResults = results;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
