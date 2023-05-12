<template>
  <div class="footer">
    <div class="urls">
      <p>Made with ❤️ by</p>
      <a class="name-url" href="https://github.com/marco94gug"
        >Marco Guglielmino</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "../../styles/utils";
.footer {
  height: 60px;
  width: 100%;
  background-color: $mainBlack;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.85rem;

  .urls {
    display: flex;
    gap: 5px;

    .name-url {
      color: white;
      font-weight: bold;
    }
  }
}
</style>
