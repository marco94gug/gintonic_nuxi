import { defineStore } from "pinia";
import { drinksState, drinksRes, drinkType } from "~~/types/drinks";

export const useDrinksStore = defineStore("drinks", {
  state: (): drinksState =>
    ({
      drink: {},
      topDrinks: {},
      mostLatestDrinks: {},
    } as drinksState),

  getters: {
    getDrink: (state) => state.drink,
    getTopDrinks: (state) => state.topDrinks,
    getMostLatestDrinks: (state) => state.mostLatestDrinks,
  },

  actions: {
    async loadTopDrinks() {
      const res = await useFetch<drinksRes>("popular.php", {
        baseURL: useRuntimeConfig().public.apiBase,
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": useRuntimeConfig().public.apiSecret,
          "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        },
      });

      const topDrinksRes = res.data.value;
      this.topDrinks = topDrinksRes;
    },

    async loadDrink(id: string) {
      const res = await useFetch<drinkType>("lookup.php", {
        baseURL: useRuntimeConfig().public.apiFreeBase,
        params: {
          i: id,
        },
      });

      const drinkRes = res.data.value;
      this.drink = drinkRes;
    },

    async loadMostLatestDrinks() {
      const res = await useFetch<drinksRes>("latest.php", {
        baseURL: useRuntimeConfig().public.apiBase,
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": useRuntimeConfig().public.apiSecret,
          "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        },
      });

      const mostLatestRes = res.data.value;
      this.mostLatestDrinks = mostLatestRes;
    },
  },
});
