<template>
  <main v-if="!drinksStore.isDrinkLoading">
    <Hero :drinkInfo="drink" />
    <Breadcrumbs
      :links="[drink?.strCategory as string, drink?.strDrink as string]"
      @OnClickLink="categoryClick"
    />
    <section class="drink_main-content">
      <Ingredients />
      <DiscoverCarousel />
      <div class="description">
        <div class="text-container">
          <p>{{ drink?.strInstructions }}</p>
        </div>
        <div class="video-container">
          <iframe
            v-if="drink.strVideo !== null"
            id="player"
            type="text/html"
            width="100%"
            height="360"
            :src="`https://www.youtube.com/embed/${IDYoutubeVideo(
              drink.strVideo
            )}`"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </section>
  </main>
  <main v-else>sto caricando...</main>
</template>

<script lang="ts" setup>
import { buildUrlPath } from "~~/services/url";
import { useDrinksStore } from "~~/stores/drinks";
import Hero from "~~/components/LayoutComponent/Hero.vue";
import Ingredients from "~/components/LayoutComponent/Ingredients.vue";
import DiscoverCarousel from "~/components/LayoutComponent/DiscoverCarousel.vue";
import { DrinkPayload } from "~/types/drinks";

const drinksStore = useDrinksStore();
const drink = drinksStore.getDrink as DrinkPayload;
const router = useRouter();

watchEffect(() => {
  if (drink?.strDrink) {
    drinksStore.stillLoading("drink", false);
  }
});

definePageMeta({
  middleware: ["drink-dispatch"],
});

//Methods
const categoryClick = (link: string | undefined): void => {
  router.push({
    name: "search-page",
    query: { category: buildUrlPath(link) },
  });
};

const IDYoutubeVideo = (link: string | null): string | void => {
  if (link !== null) {
    const youtubeURL = new URL(link);

    const ID = youtubeURL.search.split("?v=")[1];

    return ID;
  } else {
    return;
  }
};
</script>

<style lang="scss" scoped>
@import "~/styles/utils";

main {
  margin: auto;
  @include start-from("desktop") {
    max-width: 860px;
  }
  @include start-from("desktop-large") {
    max-width: 1240px;
  }
  @include start-from("desktop-extralarge") {
    max-width: 1440px;
  }

  .drink_main-content {
    .description {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .text-container {
        padding-inline: 20px;
      }

      .video-container {
        padding-inline: 20px;
      }

      @include start-from(generic-desktop) {
        flex-direction: row;
        gap: 30px;

        .text-container {
          width: 50%;
        }

        .video-container {
          width: 50%;
        }
      }
    }
  }
}
</style>
