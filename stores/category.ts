import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import { defineStore } from "pinia";
import {
  CategoryListType,
  CategoryResponse,
  FilteredDrinkByCategory,
} from "~~/types/category";
import { drinksListType } from "~~/types/drinks";

export const useCategoryStore = defineStore("category", {
  state: () =>
    ({
      categoryList: {},
      filteredByCategory: {},
      drinksResults: {},
    } as CategoryListType),

  getters: {
    getCategoryList: (state) => state.categoryList,
    getFilteredByCategory: (state) => state.filteredByCategory,
    getDrinksResults: (state) => state.drinksResults,
  },

  actions: {
    // Mutations
    clearCategoryStore() {
      this.$reset();
    },
    clearCategoryResults() {
      this.filteredByCategory = {} as drinksListType;
    },
    clearDrinksResults() {
      this.drinksResults = {} as drinksListType;
    },
    //Actions
    async load() {
      try {
        const res = await useFetch<CategoryResponse>("/category/list/", {
          baseURL: useRuntimeConfig().public.baseURL,
        });

        const categoryRes = res.data.value;
        this.categoryList = categoryRes;
      } catch (error) {
        console.error(error);
      }
    },

    async loadCategoryFilter(category: string) {
      try {
        const res = await useFetch<FilteredDrinkByCategory>("drinks", {
          baseURL: useRuntimeConfig().public.baseURL,
          params: {
            c: category,
          },
        });
        this.clearDrinksResults();
        const drinkListFilteredByCategory = res.data.value;
        this.filteredByCategory = drinkListFilteredByCategory;
      } catch (error) {
        console.error(error);
      }
    },

    async loadSearchResultedForPage(query: string) {
      try {
        const res = await useFetch<drinksListType>("search/", {
          baseURL: useRuntimeConfig().public.baseURL,
          params: {
            t: query,
          },
        });
        this.clearCategoryResults();

        const results = res.data.value;
        this.drinksResults = results;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
