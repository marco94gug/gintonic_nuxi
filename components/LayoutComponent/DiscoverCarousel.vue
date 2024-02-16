<template>
  <div class="discover">
    <div class="discover-head">
      <h4>Discover more...</h4>
      <div class="buttons">
        <button
          :class="`button-left ${isMinScrollValue() ? 'inactive' : ''}`"
          @click="scrollTo('left')"
        >
          <i class="pi pi-angle-left"></i>
        </button>
        <button
          :class="`button-right ${isMaxScrollValue() ? 'inactive' : ''}`"
          @click="scrollTo('right')"
        >
          <i class="pi pi-angle-right"></i>
        </button>
      </div>
    </div>
    <div class="discover-scoller" ref="cardScroller">
      <DiscoverCard
        v-for="drink in dataListLength(5, filteredData)"
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
import { ref } from "vue";

const router = useRouter();
const categoryStore = useCategoryStore();
const drink = useDrinksStore().getDrink as DrinkPayload;

const filteredData = categoryStore?.filteredByCategory;

const cardScroller = ref<HTMLDivElement | null>(null);
const clientWidth = ref(1);
const scrollLeft = ref(0);
const scrollWidth = ref(0);

onMounted(() => {
  cardScroller.value?.addEventListener("scroll", (e) => {
    updateScrollValue(e);
  });
});

onBeforeRouteLeave(() => {
  cardScroller.value?.removeEventListener("scroll", (e) => {
    updateScrollValue(e);
  });
});

//Methods

const scrollTo = (direction: string): void => {
  const cardScrollerTarget = cardScroller.value;
  const offSet = direction === "right" ? Math.abs(600) : -Math.abs(600);

  cardScrollerTarget?.scrollTo({
    top: 0,
    left: cardScrollerTarget.scrollLeft + offSet,
    behavior: "smooth",
  });
};

const updateScrollValue = (e: Event): void => {
  const targetScrollPosition = e.target as HTMLDivElement;

  clientWidth.value = targetScrollPosition.clientWidth;
  scrollLeft.value = targetScrollPosition.scrollLeft;
  scrollWidth.value = targetScrollPosition.scrollWidth;
};

const handleDiscoverMoreClick = (category: string): void => {
  router.push({
    name: "search-page",
    query: {
      category,
    },
  });
};

//Computed
const isMaxScrollValue = (): boolean => {
  const scrollDimension = scrollWidth.value - clientWidth.value;

  if (scrollDimension > scrollLeft.value) {
    return scrollDimension === Math.ceil(scrollLeft.value);
  } else if (scrollDimension < scrollLeft.value) {
    return scrollDimension === Math.floor(scrollLeft.value);
  } else if (scrollDimension === scrollLeft.value) {
    return true;
  } else {
    return false;
  }
};

const isMinScrollValue = (): boolean => {
  return scrollLeft.value === 0;
};
</script>

<style lang="scss" scoped>
@import "../../styles/utils";
.discover {
  width: 100%;

  &-head {
    padding-inline: 20px;

    @include start-from(generic-desktop) {
      margin-bottom: 20px;
    }

    h4 {
      text-transform: uppercase;
      color: $mainFont;

      @include start-from(generic-desktop) {
        display: flex;
        align-items: center;
      }
    }

    .buttons {
      top: 0;
      left: -20px;
      display: flex;
      height: 100%;
      pointer-events: none;
      display: none;

      button {
        flex: 0 0 auto;
        height: 40px;
        width: 40px;
        border: none;
        border-radius: 100%;
        background-color: $greyDark;
        color: white;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
        cursor: pointer;
        pointer-events: all;
        opacity: 1;
        transition: all 0.15s;

        &.inactive {
          opacity: 0.4;
          background-color: $greyTrasparent;
          color: $greyDark;
          filter: blur(0.5px);
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.403);
        }
        .right {
          transform: rotate(-90deg);
          pointer-events: none;
        }

        .left {
          transform: rotate(90deg);
          pointer-events: none;
        }
      }
    }

    @include start-from(generic-desktop) {
      display: flex;
      justify-content: space-between;
      .buttons {
        display: flex;
        gap: 5px;
      }
    }
  }

  &-scoller {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    align-items: center;
    padding: 20px;
    @include start-from(generic-desktop) {
      padding-block: 10px 30px;
      gap: 30px;
    }

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
