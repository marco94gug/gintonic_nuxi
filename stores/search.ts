import { defineStore } from "pinia";
import { DrinksListResponse } from "~~/types/drinks";

const useSearchStore = defineStore("search", {
  state: (): { drinksList: DrinksListResponse | [] } => {
    return {
      drinksList: [],
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
        const res = await useFetch<DrinksListResponse>("search", {
          baseURL: useRuntimeConfig().public.baseURL,
          params: {
            t: searchParam,
          },
        });
        const resultsDrinks = res.data.value;

        if (resultsDrinks !== null) {
          this.drinksList = resultsDrinks;
        } else {
          throw Error;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export { useSearchStore };
