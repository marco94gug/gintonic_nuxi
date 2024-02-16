<template>
  <main>
    <NavBar />
    <main class="main_section">
      <slot />
    </main>
    <Footer />
  </main>
</template>

<script lang="ts" setup>
import Footer from "~/components/LayoutComponent/Footer.vue";
</script>

<style lang="scss" scoped>
.main_section {
  margin-top: 54px;
}

@media only screen and (min-width: 768px) {
  .main_section {
    margin-top: 80px;
    min-height: calc(100vh - calc(80px + 60px));
  }
}
</style>
