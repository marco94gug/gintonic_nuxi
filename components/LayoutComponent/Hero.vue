<template>
  <section class="hero" v-if="$route.name === 'drink'">
    <div>
      <div class="img-container" style="width: 100vw">
        <h2 class="drink_title">{{ drinkInfo?.strDrink }}</h2>
        <img class="hero-img-static" :src="drinkInfo?.strDrinkThumb" />
      </div>
    </div>
  </section>
  <section class="hero" v-else>
    <div class="title">
      <h2>{{ topDrinks[scrollValue / 100].strDrink }}</h2>
      <div class="categories">
        <span>{{ topDrinks[scrollValue / 100].strCategory }}</span>
        <span>{{ topDrinks[scrollValue / 100].strAlcoholic }}</span>
      </div>
    </div>
    <div>
      <div class="button_container">
        <button @click="prevPic">
          <div v-if="scrollValue > 0" class="left">
            <i class="pi pi-angle-left"></i>
          </div>
        </button>
        <button @click="nextPic">
          <div v-if="scrollValue < maxValue()" class="right">
            <i class="pi pi-angle-right"></i>
          </div>
        </button>
      </div>
      <div class="img-container" v-for="drink in topDrinks">
        <div class="overlay" :id="drink.idDrink"></div>
        <img
          class="hero-img"
          :style="`right: ${scrollValue}vw`"
          :src="drink.strDrinkThumb"
          :title="drink.strDrink"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import "primeicons/primeicons.css";
import { drinkType } from "~~/types/drinks";

const scrollValue = ref<number>(100);

const props = defineProps<{
  topDrinks: drinkType[];
  drinkInfo?: drinkType;
}>();

const maxValue = (): number => {
  return (props.topDrinks?.length - 1) * 100;
};

const nextPic = (): void => {
  scrollValue.value < maxValue() ? (scrollValue.value += 100) : null;
};

const prevPic = (): void => {
  scrollValue.value > 0 ? (scrollValue.value -= 100) : null;
};
</script>

<style lang="scss" scoped>
@import "~/styles/utils";
.hero {
  position: relative;
  height: 30vh;
  overflow: hidden;
  background-color: #333333;

  .title {
    position: absolute;
    top: 0;
    right: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 2;

    h2 {
      color: white;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.513);
      font-size: 1.5rem;
    }

    .categories {
      display: none;
    }
  }

  div {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: nowrap;
    width: max-content;
    height: 100%;

    .button_container {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100vw;
      z-index: 2;

      button {
        background: none;
        border: none;
        color: white;
        height: 100%;
        font-size: 25px;
        width: max-content;
        margin: 0;
        padding: 0;
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.201);
        }
        .right {
          //   transform: rotate(90deg);
          padding: 0 8px;
          height: max-content;
        }
      }

      .left {
        // transform: rotate(-90deg);
        padding: 0 8px;
        height: max-content;
      }
    }

    .img-container {
      position: relative;
      width: 100vw;
      .hero-img {
        position: relative;
        top: 0;
        left: auto;
        width: 100vw;
        height: 100%;
        object-fit: cover;
        transition: all 0.8s;
        z-index: 0;
        filter: blur(1.5px);
        object-position: 0 -60px;
      }

      .hero-img-static {
        width: 100%;
        object-fit: cover;
      }
    }
  }

  .drink_title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.8rem;
    color: $whiteTransparentFont;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.715);
  }
}

@media only screen and (min-width: 768px) {
  .hero {
    margin-top: 0;
    height: 40vh;

    .title {
      flex-direction: column;
      justify-content: center;
      right: 10%;

      h2 {
        font-size: 2rem;
        text-shadow: 0 0 6px rgba(0, 0, 0, 0.658);
        font-weight: 800;
        text-transform: uppercase;
      }
      .categories {
        margin: 10px;
        display: flex;
        gap: 10px;
        height: max-content;

        span {
          background-color: rgba(236, 236, 236, 0.854);
          font-size: 0.9rem;
          padding: 8px;
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.284);
        }
      }
    }

    div {
      .button_container {
        button {
          background-color: rgba(0, 0, 0, 0.099);
        }
      }
      .img-container {
        .overlay {
          position: absolute;
          z-index: 1;
          top: 0;
          left: auto;
          height: 100%;
          width: 100vw;
          background: rgb(255, 255, 255);
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 40%,
            #333333 60%
          );
        }
      }
      .hero-img {
        top: 0;
        width: 60vw !important;
      }
    }
  }
}
</style>
