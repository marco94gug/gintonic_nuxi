import { defineStore } from "pinia";
import {
  drinksState,
  drinksRes,
  drinkType,
  drinksListType,
} from "~~/types/drinks";

type loadCases = "drink" | "topDrinks" | "latestDrinks";

export const useDrinksStore = defineStore("drinks", {
  state: (): drinksState =>
    ({
      drink: {},
      topDrinks: {},
      mostLatestDrinks: {},
      lodaingDrink: true,
      loadingTopDrinks: true,
      loadingLatestDrinks: true,
    } as drinksState),

  getters: {
    getDrink: (state) => state.drink,
    getTopDrinks: (state) => state.topDrinks as drinksListType,
    getMostLatestDrinks: (state) => state.mostLatestDrinks as drinksListType,
    isTopDrinkLoading: (state) => state.loadingTopDrinks,
    isDrinkLoading: (state) => state.lodaingDrink,
    isLatestLoading: (state) => state.loadingLatestDrinks,
  },

  actions: {
    stillLoading(loadCase: loadCases, condition: boolean): void {
      switch (loadCase) {
        case "drink":
          this.lodaingDrink = condition;
          break;
        case "topDrinks":
          this.loadingTopDrinks = condition;
          break;
        case "latestDrinks":
          this.loadingLatestDrinks = condition;
          break;

        default:
          break;
      }
    },

    async loadTopDrinks() {
      try {
        this.stillLoading("topDrinks", true);
        const res = await useFetch<drinksListType>("popular.php", {
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": useRuntimeConfig().public.apiSecret,
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
          },
        });

        if (res.data.value !== null) {
          const topDrinksRes = res.data.value;
          this.topDrinks = topDrinksRes;
          this.stillLoading("topDrinks", false);
        } else {
          throw Error;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async loadDrink(id: string) {
      try {
        const res = await useFetch<drinksListType>("lookup.php", {
          baseURL: useRuntimeConfig().public.apiFreeBase,
          params: {
            i: id,
          },
        });

        if (res.data.value !== null) {
          this.drink = res.data.value.drinks[0];
        } else {
          throw Error;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async loadMostLatestDrinks() {
      try {
        const res = await useFetch<drinksListType>("latest.php", {
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": useRuntimeConfig().public.apiSecret,
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
          },
        });

        if (res.data.value !== null) {
          const mostLatestRes = res.data.value;
          this.mostLatestDrinks = mostLatestRes;
        } else {
          throw Error;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
