<template>
  <nav @mouseleave="closeAllOpenedMenus">
    <h1 @click="handleHomeClick">The Cocktail DB</h1>
    <HamMen
      :setActiveMenu="setActiveMenu"
      :isMenuActive="navbarStore.getHamMenuIsActive"
    />
    <ul
      class="menu-list"
      :class="` ${navbarStore.getHamMenuIsActive ? 'active' : ''}`"
    >
      <li @click="handleHomeClick">Home</li>
      <li @click="handleMenuLIElementClick">Cocktails</li>
      <li
        :class="`category ${
          navbarStore.getCategoryListIsActive ? 'active' : ''
        }`"
        @click="handleCategoriesClick"
      >
        Categories <span>▲</span>
      </li>
      <ol
        :class="`category-list ${
          navbarStore.getCategoryListIsActive ? 'active' : ''
        }`"
      >
        <li
          v-for="category in categoryStore?.getCategoryList"
          @click="handleCategoryClick(category)"
        >
          {{ category.strCategory }}
        </li>
      </ol>
      <li @click="handleMenuLIElementClick">About us</li>
    </ul>
    <SearchBar />
  </nav>
</template>

<script lang="ts" setup>
import { buildUrlPath } from "@/services/url";
import type { CategoryPayload } from "@/types/category";

import { useNavBarStore } from "@/stores/navbar";
import { useCategoryStore } from "@/stores/category";
import { useSearchStore } from "@/stores/search";

const router = useRouter();
const navbarStore = useNavBarStore();
const categoryStore = useCategoryStore();
const searchStore = useSearchStore();

//Functions:
function setActiveMenu(): void {
  navbarStore.setHamMenuToggle();

  if (navbarStore.getHamMenuIsActive) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

function handleCategoriesClick(): void {
  navbarStore.setCategoryListToggle();
  searchStore.clearSearchResults();
}

function handleHomeClick(): void {
  router.push("/");

  closeAllOpenedMenus();
}

function handleCategoryClick(category: CategoryPayload): void {
  closeAllOpenedMenus();
  router.push({
    name: "search-page",
    query: { category: buildUrlPath(category.strCategory) },
  });
}

function handleMenuLIElementClick(e: MouseEvent): void {
  const menuListElement = e.target as HTMLLIElement;
  console.log("handleMenuLIElementClick_fn");
  closeAllOpenedMenus();

  router.push(
    `/${menuListElement.textContent?.toLowerCase().replaceAll(" ", "-")}`
  );
}

function closeAllOpenedMenus(): void {
  navbarStore.setCategoryListClose();
  navbarStore.setHamMenuClose();
  searchStore.clearSearchResults();

  document.body.style.overflow = "auto";
}
</script>

<style lang="scss" scoped>
@import "../styles/utils";

nav {
  position: static;
  top: 0;
  width: 100%;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background-color: $mainDarkGrey;
  height: 80px;
  color: rgb(245, 245, 245);
  font-family: "Big Shoulders Display", Helvetica, sans-serif;

  h1 {
    font-size: 2rem;
    text-transform: uppercase;
    cursor: pointer;
  }

  .menu-list {
    position: absolute;
    top: calc(80px + 54px);
    background-color: #2b2b2b;
    right: 0;
    z-index: 4;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    height: 0px;
    overflow: hidden;
    transition: all 0.35s;

    &::-webkit-scrollbar {
      display: none;
    }

    &.active {
      height: calc(100vh - (80px + 54px - 20px));
      padding: 40px 0;
      overflow: auto;
    }

    li {
      margin: 20px 0;
      font-size: 1.2rem;
      letter-spacing: 1.5px;
      cursor: pointer;
      transition: all 0.35s;
      width: max-content;
      display: flex;
      gap: 10px;
      align-items: center;

      span {
        font-size: 0.6rem;
        pointer-events: none;
        transition: all 0.35s;
      }

      &.active {
        span {
          transform: rotate(180deg);
        }
      }

      &:hover {
        border-bottom: 1px solid rgba(245, 245, 245);
      }
    }

    .category-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      background-color: $mainBlack;
      width: 100%;
      align-items: center;
      padding: 0;
      height: 0px;
      overflow: hidden;
      color: rgba(255, 255, 255, 0.614);
      letter-spacing: 1.2px;
      transition: all 0.25s;

      &.active {
        display: flex;
        height: max-content;
        opacity: 1;
        overflow: unset;
        padding: 20px 0;
      }

      li {
        font-size: 0.95rem;
        margin: 8px 0;
      }
    }
  }
}

@include start-from("generic-desktop") {
  nav {
    position: fixed;
    width: 100%;
    gap: 20px;

    h1 {
      flex: 0 0 auto;
      width: max-content;
    }

    .menu-list {
      margin-left: 10px;
      flex-direction: row;
      justify-content: flex-start;
      position: relative;
      top: auto;
      background: none;
      opacity: 1;
      gap: 20px;
      height: max-content;
      overflow: visible;

      li {
        span {
          display: none;
        }

        &.active {
          border-bottom: 1px solid rgba(245, 245, 245);
        }
      }

      .category-list {
        position: absolute;
        padding: 0;
        display: grid;
        grid-template-columns: auto auto auto;
        font-size: 1.05rem;
        top: 70px;
        left: 0;
        gap: 0;
        width: max-content;
        overflow: hidden !important;

        &.active {
          display: grid;
          padding: 0;
          height: 220px;
          width: max-content;
        }

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 20px;
          margin: 0;
          width: 180px;

          &:hover {
            border: none;
            background-color: rgba(255, 255, 255, 0.82);
            color: rgba(0, 0, 0, 0.627);

            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
