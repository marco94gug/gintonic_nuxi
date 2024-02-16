import { defineStore } from "pinia";
import { uniqBy } from "~/services/uniqBy";
import type {
  DrinksStoreState,
  DrinksListResponse,
  DrinkPayload,
} from "@/types/drinks";

type loadCases = "drink" | "topDrinks" | "latestDrinks";

export const useDrinksStore = defineStore("drinks", {
  state: (): DrinksStoreState => ({
    drink: {},
    topDrinks: [],
    mostLatestDrinks: [],
    lodaingDrink: true,
    loadingTopDrinks: true,
    loadingLatestDrinks: true,
  }),

  getters: {
    getDrink: (state) => state.drink,
    getTopDrinks: (state) => state.topDrinks,
    getMostLatestDrinks: (state) => state.mostLatestDrinks,
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
        const res = await useFetch<DrinksListResponse>("popular", {
          baseURL: useRuntimeConfig().public.baseURL,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const topDrinksRes = res.data.value;

        if (topDrinksRes !== null) {
          const removedDuplicatedResponses = uniqBy(topDrinksRes);

          this.topDrinks = removedDuplicatedResponses;

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
        const res = await useFetch<DrinkPayload>(`/drinks/${id}`, {
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
        const res = await useFetch<DrinksListResponse>("latest", {
          baseURL: useRuntimeConfig().public.baseURL,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const mostLatestRes = res.data.value;

        if (mostLatestRes !== null) {
          const removedDuplicatedRes = uniqBy(mostLatestRes);

          this.mostLatestDrinks = removedDuplicatedRes;
        } else {
          throw Error;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
