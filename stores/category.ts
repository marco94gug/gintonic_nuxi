import { defineStore } from "pinia";
import {
  CategoryListType,
  CategoryResponse,
  FilteredDrinkByCategory,
} from "~~/types/category";
import { drinksListType } from "~~/types/drinks";

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
    //Mutations
    clearCategoryStore() {
      this.$reset();
    },

    //Actions
    async load() {
      try {
        const res = await useFreeFetch("list.php", {
          params: {
            c: "list",
          },
        });

        const categoryList = res.data.value;
        this.categoryList = categoryList;
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
