<template>
  <div class="discover">
    <div class="discover-head">
      <h4>Discover more...</h4>
    </div>
    <div class="discover-scoller">
      <DiscoverCard
        v-for="drink in dataListLength(4, filteredData)"
        :drink-info="drink"
      />
      <div
        class="discover-more-card"
        @click="() => handleDiscoverMoreClick(drink.strCategory)"
      >
        <p>Seel All</p>
        <i class="pi pi-reply"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DiscoverCard from "./DiscoverCard.vue";
import { useRouter } from "nuxt/app";
import "primeicons/primeicons.css";
import { dataListLength } from "~/services/arrayLength";
import { useDrinksStore } from "~/stores/drinks";
import { DrinkPayload } from "~/types/drinks";
import { useCategoryStore } from "~~/stores/category";

const router = useRouter();
const categoryStore = useCategoryStore();
const drink = useDrinksStore().getDrink as DrinkPayload;

const filteredData = categoryStore?.filteredByCategory;

const handleDiscoverMoreClick = (category: string): void => {
  router.push({
    name: "search-page",
    query: {
      category,
    },
  });
};
</script>

<style lang="scss" scoped>
@import "../../styles/utils";
.discover {
  width: 100%;

  &-head {
    padding-inline: 20px;

    h4 {
      text-transform: uppercase;
      color: $mainFont;
    }
  }

  &-scoller {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    align-items: center;
    padding: 20px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &-more-card {
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 135px;
    height: 70px;
    background-color: $greyDark;
    border-radius: 4px;
    color: white;
    cursor: pointer;

    p {
      text-decoration: underline;
    }
  }
}
</style>
