<template>
  <div class="main-search">
    <form class="search-bar" @submit="handleSubmitEvent">
      <input
        type="text"
        placeholder="Search"
        v-model="inputValue"
        @input="handleOnSearchInput(inputValue)"
        @click="closeAllMenu"
      />
      <div class="delete" v-if="inputValue">
        <font-awesome-icon icon="fa fa-circle-xmark" @click="clearSearchBar" />
      </div>
    </form>

    <div v-if="isResultsVisible()" class="results">
      <ul>
        <li
          v-for="drink in searchStore.getDrinksListResult.drinks"
          :id="drink.idDrink"
          @click="handleDrinkClick"
        >
          {{ drink.strDrink }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useNavBarStore } from "~~/stores/navbar";
import { useSearchStore } from "../stores/search";

const inputValue = ref("");
const navbarStore = useNavBarStore();
const searchStore = useSearchStore();
const router = useRouter();

//Functions
const handleOnSearchInput = (input: string): void => {
  console.log(input);
  if (input.length > 1) {
    searchStore.loadSearchResults(input);
  } else {
    searchStore.clearSearchResults();
  }
  console.log(searchStore.getDrinksListResult.drinks);
};

const closeAllMenu = () => {
  navbarStore.setCategoryListClose();
  navbarStore.setHamMenuClose();
};

const handleSubmitEvent = (e: Event) => {
  e.preventDefault();
  // this.$store.commit("category/CLEAR_CATEGORY_FILTERED")
  router.push({
    name: "search-page",
    query: { text: inputValue.value },
  });
  clearSearchBar();
};

const handleDrinkClick = (e: Event): void => {
  const idDrink = (e.target as HTMLLIElement).id;
  clearSearchBar();
  router.push(`/drink/${idDrink}`);
};

const clearSearchBar = (): void => {
  inputValue.value = "";
  searchStore.clearSearchResults();
};

const isResultsVisible = (): boolean => {
  return Boolean(searchStore.getDrinksListResult.drinks);
};
</script>

<style lang="scss" scoped>
.main-search {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  padding: 10px 20px;
  background-color: rgb(93, 93, 93);

  .search-bar {
    font-family: "Source Sans Pro", sans-serif;
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;

    input {
      height: 34px;
      padding: 0 10px;
      position: relative;
      box-sizing: border-box;
      width: 100%;
      border-radius: none;
      color: rgba(0, 0, 0, 0.571);
      font-weight: 300;
      font-size: 1.02rem;

      &:focus {
        outline: none;
      }

      &::placeholder {
        letter-spacing: 0.5px;
        opacity: 0.7;
      }
    }
  }

  .delete {
    position: absolute;
    background-color: none;
    top: 0;
    margin-right: 8px;
    height: 100%;
    display: flex;
    align-items: center;
    right: 0;
    color: black;
    cursor: pointer;
  }

  .results {
    position: absolute;
    top: 54px;
    left: 0;
    z-index: 4;
    width: 100%;
    height: max-content;
    background-color: rgba(255, 255, 255, 0.436);
    backdrop-filter: blur(5px);
    color: rgb(26, 26, 26);
    letter-spacing: 1px;
    font-weight: bold;

    ul {
      display: flex;
      flex-direction: column;
      padding: 10px 20px;
      max-height: 400px;
      overflow-y: auto;

      li {
        padding-block: 3px;
      }
    }
  }
}
@media only screen and (min-width: 768px) {
  .main-search {
    background: none;
    position: relative;
    padding: 0;
    top: auto;
    flex: 0 0 auto;
    width: 30%;

    .results {
      top: 34px;

      ul {
        padding: 10px 0;

        li {
          cursor: pointer;
          padding-inline: 10px;

          &:hover {
            background-color: white;
          }
        }
      }
    }
  }
}
</style>
