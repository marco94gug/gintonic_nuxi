<template>
  <div class="discover">
    <div class="discover-head">
      <h4>Discover more...</h4>
    </div>
    <div class="discover-scoller">
      <DiscoverCard
        v-for="drink in dataListLength(4, mostLatestDrinks)"
        :drink-info="drink"
      />
      <div class="discover-more-card">
        <p>Seel All</p>
        <i class="pi pi-reply"></i>
      </div>
    </div>
  </div>
</template>

<script type="ts" setup>
import DiscoverCard from './DiscoverCard.vue';
import "primeicons/primeicons.css";
import { dataListLength } from '~/services/arrayLength';
import { useDrinksStore } from "~~/stores/drinks";

const mostLatestDrinks = useDrinksStore().getMostLatestDrinks;
</script>

<style lang="scss" scoped>
@import "../../styles/utils";
.discover {
  width: 100%;
  height: 120px;
  margin-bottom: 20px;
  //   background-color: rgb(0, 60, 255);

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
    height: 100%;
    align-items: center;
    padding-inline: 20px;

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
