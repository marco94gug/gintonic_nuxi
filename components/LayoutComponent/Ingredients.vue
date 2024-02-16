<template>
  <section class="ingredients">
    <h3>Ingredients:</h3>
    <ul class="list">
      <li v-for="ingredient in ingredientsChecked">
        {{ ingredient.ingredient }} <span>{{ ingredient.measure }}</span>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import type { DrinkPayload } from "@/types/drinks";
import { useDrinksStore } from "@/stores/drinks";

const drinksStore = useDrinksStore();
const drink = drinksStore.getDrink as DrinkPayload;

// Sometimes the Proxy can return ingredients with null value
const ingredientsChecked = drink.ingredients.filter(
  (item) => item.ingredient !== null
);
</script>

<style lang="scss" scoped>
@import "~/assets/styles/utils";
.ingredients {
  width: 100%;
  background-color: $white01;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;

  @include start-from(generic-desktop) {
    padding: 30px 25px;
    margin-bottom: 30px;
  }

  h3 {
    color: $mainFont;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    margin-bottom: 20px;

    @include start-from(generic-desktop) {
      font-size: 1.15rem;
      margin-bottom: 30px;
    }

    &::after {
      content: "";
      display: block;
      height: 3px;
      width: 50px;
      background-color: $mainFont;
      margin-top: 10px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    padding-inline: 20px;
    gap: 10px;

    @include start-from(generic-desktop) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      row-gap: 10px;
    }
    li {
      font-weight: 600;
      color: $mainFont;

      &::before {
        content: "";
        display: inline-block;
        flex-direction: row;
        width: 4px;
        height: 4px;
        background-color: none;
        border-radius: 50%;
        border: 2px solid $greySecondary;
        margin-right: 15px;
      }

      span {
        font-weight: 200;
        font-style: italic;
      }
    }
  }
}
</style>
