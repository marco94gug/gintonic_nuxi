<template>
  <div class="breadcrumbs">
    <ul>
      <li @click="$router.push('/')">Home</li>
      <div v-for="(link, index) in links">
        <span>{{ ">" }}</span>
        <li
          @click="linkClick(link)"
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
@import "../styles/utils";
.breadcrumbs {
  padding: 20px 0 20px 30px;
  color: rgb(37, 37, 37);
  font-weight: bold;
  text-transform: capitalize;
  font-size: 0.85rem;

  ul {
    display: flex;
    gap: 5px;

    div {
      display: flex;
      gap: 5px;
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

@include start-from("desktop") {
  .breadcrumbs {
    font-size: 1rem;
    padding-left: 30px;
  }
}
</style>
