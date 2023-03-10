import { defineStore } from "pinia";
import { drinksListType } from "~~/types/drinks";

const useSearchStore = defineStore("search", {
  state: () => {
    return {
      drinksList: {} as drinksListType | null,
    };
  },

  getters: {
    getDrinksListResult: (state) => state.drinksList,
  },

  actions: {
    //Mutations:

    clearSearchResults() {
      this.$reset();
    },

    //async Actions:
    async loadSearchResults(searchParam: string) {
      try {
        const res = await useFetch<drinksListType>("search.php", {
          baseURL: useRuntimeConfig().public.apiFreeBase,
          params: {
            s: searchParam,
          },
        });
        const resultsDrinks = res.data.value;
        this.drinksList = resultsDrinks;
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export { useSearchStore };
