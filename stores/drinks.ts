import { defineStore } from "pinia";
import { drinksState, drinksListType, drinkType } from "~~/types/drinks";

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
        const res = await useFetch<drinksListType>("popular", {
          baseURL: useRuntimeConfig().public.baseURL,
          headers: {
            "Content-Type": "application/json",
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
        const res = await useFetch<drinkType>(`/drinks/${id}`, {
          baseURL: useRuntimeConfig().public.baseURL,
        });

        if (res.data.value !== null) {
          this.drink = res.data.value;
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
        const res = await useFetch<drinksListType>("latest", {
          baseURL: useRuntimeConfig().public.baseURL,
          headers: {
            "Content-Type": "application/json",
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
