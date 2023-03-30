<template>
  <div class="drink_card" @click="onClick(drinkInfo.idDrink)">
    <img
      :class="`img ${isCategoryFilteredDrink() ? 'category' : ''}`"
      :src="drinkInfo.strDrinkThumb"
      :alt="drinkInfo.strDrink"
    />
    <div :class="`drink_info ${isCategoryFilteredDrink() ? 'category' : ''}`">
      <h3>{{ drinkInfo.strDrink }}</h3>

      <slot name="see-more"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { drinkType } from "~~/types/drinks";

const route = useRoute();

defineProps<{
  drinkInfo: drinkType;
}>();

const emit = defineEmits<{
  (event: "clicked", id: string): void;
}>();

//Computed
const isCategoryFilteredDrink = (): boolean => {
  return route.name === "search-page";
};

//Methods
const onClick = (id: string): void => {
  emit("clicked", id);
};
</script>

<style lang="scss" scoped>
@import "../styles/utils";
.drink_card {
  background-color: rgb(239, 239, 239);
  border-radius: 10px;
  overflow: hidden;
  flex: 0 0 auto;
  width: 200px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.232);
  cursor: pointer;

  img {
    height: 200px;
  }

  .img {
    &.category {
      @include start-from("phone") {
        width: 150px;
        object-fit: cover;
      }
    }
  }
  .drink_info {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    font-size: 0.95rem;

    &.category {
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      height: 100%;
      width: 100%;
      padding: 12px;

      h3 {
        font-weight: bold;
        color: $mainFont;
      }

      p {
        align-self: flex-end;
        font-weight: 200;
        font-size: 0.8rem;
        color: rgba(0, 0, 0, 0.288);
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .drink_card {
    width: 300px;

    &:hover  {
      border: 2px solid red;
    }

    img {
      height: 300px;
    }

    .drink_info {
      font-size: 1rem;
    }
  }
}
</style>
