<template>
  <div @click="setActiveMenu" :class="`${isMenuActive ? 'active' : 'none'}`">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

//TO-DO: convert on script setup typescript
<script>
export default {
  props: {
    setActiveMenu: {
      require: true,
      type: Function,
    },
    isMenuActive: {
      require: true,
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: max-content;

  span {
    background-color: rgb(255, 255, 255);
    height: 3px;
    width: 25px;
    transition: all 0.5s;
    pointer-events: none;
  }

  &.active {
    span:nth-child(1) {
      transform: rotate(45deg) translateY(5px) translateX(5px);
    }

    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(3) {
      transform: rotate(-45deg) translateY(-6px) translateX(6px);
    }
  }
}

@media only screen and (min-width: 768px) {
  div {
    display: none;
    span {
      opacity: 0;
    }
  }
}
</style>
