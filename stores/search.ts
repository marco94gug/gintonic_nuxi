import { defineStore } from "pinia";
import { uniqBy } from "~/services/uniqBy";
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
          const removedDuplicatedResults = uniqBy(resultsDrinks);

          this.drinksList = removedDuplicatedResults;
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
