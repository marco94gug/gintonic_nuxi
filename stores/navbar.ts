import { defineStore } from "pinia";
import { navBarStatusType } from "~~/types/navBarStatus";

export const useNavBarStore = defineStore("navBar", {
  state: () => {
    return {
      hamMenuIsActive: false,
      categoryListIsActive: false,
    } as navBarStatusType;
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
