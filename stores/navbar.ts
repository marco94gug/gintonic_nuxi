import { defineStore } from "pinia";
import type { NavBarState } from "@/types/navBarStatus";

export const useNavBarStore = defineStore("navBar", {
  state: (): NavBarState => {
    return {
      hamMenuIsActive: false,
      categoryListIsActive: false,
    };
  },

  getters: {
    getHamMenuIsActive: (state) => state.hamMenuIsActive,
    getCategoryListIsActive: (state) => state.categoryListIsActive,
  },

  actions: {
    setHamMenuClose() {
      this.hamMenuIsActive = false;
    },

    setHamMenuToggle() {
      this.hamMenuIsActive = !this.hamMenuIsActive;
    },

    setCategoryListClose() {
      this.categoryListIsActive = false;
    },

    setCategoryListToggle() {
      this.categoryListIsActive = !this.categoryListIsActive;
    },
  },
});
