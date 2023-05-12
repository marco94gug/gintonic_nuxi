import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import { defineStore } from "pinia";
import { CategoryState, CategoryResponse } from "~~/types/category";
import { DrinksListResponse } from "~~/types/drinks";

export const useCategoryStore = defineStore("category", {
  state: (): CategoryState => ({
    categoryList: [],
    filteredByCategory: [],
    drinksResults: [],
  }),

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
      this.filteredByCategory = [];
    },
    clearDrinksResults() {
      this.drinksResults = [];
    },

    //Actions
    async load() {
      try {
        const res = await useFetch<CategoryResponse>("/category/list/", {
          baseURL: useRuntimeConfig().public.baseURL,
        });

        if (res.data.value !== null) {
          const categoryRes = res.data.value;
          this.categoryList = categoryRes;
        } else {
          throw Error;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async loadCategoryFilter(category: string) {
      try {
        const res = await useFetch<DrinksListResponse>("category", {
          baseURL: useRuntimeConfig().public.baseURL,
          params: {
            c: category,
          },
        });
        this.clearDrinksResults();
        const drinkListFilteredByCategory = res.data.value;

        if (drinkListFilteredByCategory !== null) {
          this.filteredByCategory = drinkListFilteredByCategory;
        } else {
          throw Error;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async loadSearchResultedForPage(query: string) {
      try {
        const res = await useFetch<DrinksListResponse>("search", {
          baseURL: useRuntimeConfig().public.baseURL,
          params: {
            t: query,
          },
        });
        this.clearCategoryResults();

        const results = res.data.value;

        if (results !== null) {
          this.drinksResults = results;
        } else {
          throw Error;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
