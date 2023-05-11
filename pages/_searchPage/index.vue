<template>
  <section>
    <Breadcrumbs :links="[route.query.text ? 'search' : title]" />
    <div class="category_main_content">
      <h2>{{ title }}</h2>
      <div
        class="grid-drink"
        v-if="
          categoryStore.getFilteredByCategory || categoryStore.getDrinksResults
        "
      >
        <Card
          v-for="drink in categoryStore.getFilteredByCategory ??
          categoryStore.getDrinksResults"
          :drinkInfo="drink"
          @clicked="clickCard"
        >
          <template v-slot:see-more>
            <p class="card-paragraph">see more</p>
          </template>
        </Card>
      </div>
      <div class="no-results" v-else>
        <h3>Something went wrong :&#40;</h3>
        <img src="../../assets/img/404.png" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCategoryStore } from "~~/stores/category";

const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();

const title = ref("");

definePageMeta({
  middleware: ["category-dispatch"],
});

watch(route, (route) => {
  const titleNotFormatted =
    (route.query.category as string) ?? (route.query.text as string);

  isListResulted(
    categoryStore.getFilteredByCategory === undefined &&
      categoryStore.getDrinksResults === undefined,
    titleNotFormatted
  );
});

onMounted(() => {
  const titleNotFormatted =
    (route.query.category as string) ??
    `You serched for: ${route.query.text as string}`;

  isListResulted(
    categoryStore.getFilteredByCategory === undefined &&
      categoryStore.getDrinksResults === undefined,
    titleNotFormatted
  );
});

//Methods
const clickCard = (id: string): void => {
  router.push(`/drink/${id}`);
};

const isListResulted = (
  condition: boolean,
  titleToBeFormatted: string
): void => {
  condition
    ? (title.value = "Error")
    : (title.value = titleToBeFormatted.replace("-", "/").replaceAll("_", " "));
};
</script>

<style lang="scss" scoped>
@import "../../styles/utils";

section {
  margin-top: 54px;

  .category_main_content {
    padding: 0 20px 20px 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    h2 {
      color: $mainFont;
      text-transform: capitalize;
      font-size: 1.4rem;
    }

    .grid-drink {
      display: grid;
      width: max-content;
      align-content: center;
      gap: 20px;

      div {
        @include start-from("phone") {
          display: flex;
          width: 100%;
        }
      }
    }

    .no-results {
      position: absolute;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 50px;
      height: 100vh;
      pointer-events: none;
      opacity: 0.8;

      img {
        width: 50%;
      }
    }
  }
}

@include start-from("phone") {
  section {
    .category_main_content {
      .grid-drink {
        width: 100%;
      }
    }
  }
}

@include start-from("tablet") {
  section {
    .category_main_content {
      margin-top: 10px;
      gap: 30px;

      h2 {
        font-size: 1.5rem;
      }
      .grid-drink {
        grid-template-columns: repeat(2, 260px);
      }
    }
  }

  .card-paragraph {
    display: none;
  }
}

@include start-from("desktop") {
  section {
    .category_main_content {
      margin-top: 15px;
      gap: 35px;

      h2 {
        font-size: 1.6rem;
      }

      .grid-drink {
        grid-template-columns: repeat(3, 260px);
      }
    }
  }

  .card-paragraph {
    display: none;
  }
}

@include start-from("desktop-large") {
  section {
    .category_main_content {
      margin-top: 0;
      gap: 56px;

      h2 {
        font-size: 1.7rem;
      }

      .grid-drink {
        grid-template-columns: repeat(4, 260px);
      }
    }
  }

  .card-paragraph {
    display: none;
  }
}

@include start-from("desktop-extralarge") {
  section {
    .category_main_content {
      margin-top: 0px;
      gap: 56px;

      h2 {
        font-size: 1.7rem;
      }

      .grid-drink {
        grid-template-columns: repeat(5, 260px);
      }
    }
  }

  .card-paragraph {
    display: none;
  }
}
</style>
