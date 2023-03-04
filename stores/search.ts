import { defineStore } from "pinia";
import { drinksListType } from "~~/types/drinks";

const useSearchStore = defineStore("search", {
  state: () => {
    return {
      drinksList: {} as drinksListType,
    };
  },

  getters: {
    getDrinksListResult: (state) => state.drinksList,
  },

  actions: {
    //Mutations:
    setSearchResults(payload: drinksListType) {
      this.drinksList = payload;
    },

    clearSearchResults() {
      this.$reset();
    },

    //async Actions:
    async loadSearchResults(searchParam: string) {
      const nuxtApp = useNuxtApp();
      try {
        const res = await useRapidFetch("search.php", {
          params: {
            s: searchParam,
          },
        });
        const resultsDrinks = res.data.value;
        this.setSearchResults(resultsDrinks);
        console.log(this.drinksList);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export { useSearchStore };
