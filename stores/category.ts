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
        const res = await useFetch<CategoryResponse>("list.php", {
          baseURL: useRuntimeConfig().public.apiFreeBase,
          params: {
            c: "list",
          },
        });

        const categoryRes = res.data.value;
        this.categoryList = categoryRes;
      } catch (error) {
        console.error(error);
      }
    },

    async loadCategoryFilter(category: string) {
      try {
        const res = await useFetch<FilteredDrinkByCategory>("filter.php", {
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": useRuntimeConfig().public.apiSecret,
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
          },
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
        const res = await useFetch<drinksListType>("search.php", {
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": useRuntimeConfig().public.apiSecret,
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
          },
          params: {
            s: query,
          },
        });
        this.clearCategoryResults();

        const results = res.data.value;
        this.drinksResults = results as drinksListType;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
