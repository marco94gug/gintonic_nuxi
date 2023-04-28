<template>
  <div>
    <h2 class="carousel-title">{{ title }}</h2>
    <div class="carousel-container">
      <div class="carousel" ref="cardScroller">
        <Card
          v-for="drink in dataListLength(8)"
          :drinkInfo="drink"
          @clicked="clickCard"
        />
      </div>
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { drinkType } from "~~/types/drinks";

const cardScroller = ref<HTMLDivElement | null>(null);
const clientWidth = ref(1);
const scrollLeft = ref(0);
const scrollWidth = ref(0);

const router = useRouter();

const props = defineProps<{
  dataList?: drinkType[];
  title: string;
}>();

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

//Methods
const dataListLength = (n: number): drinkType[] => {
  return (props.dataList as drinkType[])?.filter((_, i: number) => i < n);
};

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

const clickCard = (id: string): void => {
  router.push(`/drink/${id}/`);
};
</script>

<style lang="scss" scoped>
@import "../styles/utils";
.carousel-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: rgb(21, 21, 21);
  margin-left: 20px;
}

.carousel-container {
  position: relative;
  padding: 10px 0;
  .carousel {
    display: flex;
    gap: 15px;
    width: 100%;
    padding-block: 5px;
    overflow-x: scroll;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .buttons {
    position: absolute;
    top: 0;
    left: -20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: calc(100% + 40px);
    pointer-events: none;
    display: none;

    button {
      flex: 0 0 auto;
      height: 40px;
      width: 40px;
      border: none;
      border-radius: 100%;
      background-color: rgb(247, 247, 247);
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.166);
      cursor: pointer;
      pointer-events: all;
      opacity: 1;
      transition: all 0.15s;

      &.inactive {
        opacity: 0;
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
}

@include start-from("generic-desktop") {
  .carousel-title {
    margin: 0;
  }

  .carousel-container {
    margin-block: 20px;
    .buttons {
      display: flex;
    }
    .carousel {
      gap: 16px;
    }
  }
}
</style>
