<template>
  <div class="discover-card" @click="() => handleClickCard(drinkInfo.idDrink)">
    <img :src="drinkInfo.strDrinkThumb" :alt="drinkInfo.strDrink" />
    <h5>{{ drinkInfo.strDrink }}</h5>
  </div>
</template>

<script lang="ts" setup>
import { DrinkPayload } from "~/types/drinks";
import { useRouter } from "nuxt/app";

const router = useRouter();

defineProps<{
  drinkInfo: DrinkPayload;
}>();

const handleClickCard = (id: string): void => {
  router.push(`/drink/${id}`);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style lang="scss" scoped>
@import "../../styles/utils";
.discover-card {
  height: 70px;
  width: 220px;
  border-radius: 4px;
  flex: 0 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.185);
  cursor: pointer;

  @include start-from(generic-desktop) {
    height: 75px;
    width: 230px;
  }

  img {
    height: 100%;
  }

  h5 {
    flex: 0 0 auto;
    padding-inline: 15px;
    width: calc(220px - 70px);
    color: $mainFont;
    font-size: 0.85rem;
    font-weight: 600;
    @include start-from(generic-desktop) {
      font-size: 0.95rem;
    }
  }
}
</style>
