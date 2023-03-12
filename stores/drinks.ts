import { defineStore } from "pinia";
import {
  drinksState,
  drinksRes,
  drinkType,
  drinksListType,
} from "~~/types/drinks";

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
      this.topDrinks = topDrinksRes as drinksRes;
    },

    async loadDrink(id: string) {
      console.log("sto facendo la chiamata");
      const res = await useFetch<drinksListType>("lookup.php", {
        baseURL: useRuntimeConfig().public.apiFreeBase,
        params: {
          i: id,
        },
      });
      const drinkRes = res.data.value?.drinks[0];
      this.drink = drinkRes as drinkType;
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
