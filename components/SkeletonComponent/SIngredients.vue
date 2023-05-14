<template>
  <section class="ingredients">
    <img :src="`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`" />
  </section>
</template>

<script lang="ts" setup>
import { toBase64, shimmer } from "~/services/Shimmer";
</script>

<style lang="scss" scoped>
@import "~/styles/utils";
.ingredients {
  width: 100%;
  background-color: $white01;
  margin-bottom: 20px;
  margin-top: 52px;
  border-radius: 4px;
  height: 200px;
  overflow: hidden;

  @include start-from(generic-desktop) {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 30px;
    margin-top: 76px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
