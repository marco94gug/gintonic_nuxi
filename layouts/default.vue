<template>
  <main>
    <NavBar />
    <main class="main_section">
      <slot />
    </main>
  </main>
</template>

<style lang="scss" scoped>
.main_section {
  margin-top: 54px;
}

@media only screen and (min-width: 768px) {
  .main_section {
    margin-top: 80px;
  }
}
</style>
