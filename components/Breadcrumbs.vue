<template>
  <div class="breadcrumbs">
    <ul>
      <li @click="$router.push('/')">Home</li>
      <div v-for="(link, index) in links">
        <span>{{ ">" }}</span>
        <li
          @click="(): void => linkClick(link)"
          :style="`${links.length - 1 === index ? styleLinkVisited() : ''}`"
        >
          {{ link }}
        </li>
      </div>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: "OnClickLink", link: string): void;
}>();

defineProps<{
  links: string[];
}>();

const styleLinkVisited = (): string => {
  return "text-decoration: none; cursor: default; color: #00000065; pointer-events: none";
};

const linkClick = (link: string): void => {
  emit("OnClickLink", link);
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils";
.breadcrumbs {
  padding-block: 20px;
  padding-inline: 20px;
  color: rgb(37, 37, 37);
  font-weight: bold;
  text-transform: capitalize;
  font-size: 0.8rem;

  ul {
    display: flex;
    gap: 3px;

    div {
      display: flex;
      gap: 3px;
      align-items: center;
    }

    li {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@include start-from("tablet") {
  .breadcrumbs {
    font-size: 1rem;
    padding-left: 30px;
  }
}

@include start-from(generic-desktop) {
  .breadcrumbs {
    font-size: 1rem;
    padding-left: 30px;
    padding-block: 30px;
  }
}
</style>
