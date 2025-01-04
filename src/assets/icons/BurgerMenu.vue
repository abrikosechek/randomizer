<template>
  <svg class="burger-menu" viewBox="0 0 100 100" width="40" height="40" :class="{ active }">
    <rect class="line top" width="80" height="10" y="15" x="10" rx="5" stroke="transparent" />
    <rect class="line middle" width="80" height="10" y="45" x="10" rx="5" stroke="transparent" />
    <rect class="line bottom" width="80" height="10" y="75" x="10" rx="5" stroke="transparent" />
  </svg>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang='scss'>
.burger-menu {

  .line {
    transition: 0.3s;
    transform-origin: center;
  }

  &.active {
    &>.middle {
      x: 50;
      width: 0;
      opacity: 0.2;
    }

    &>.top,
    &>.bottom {
      y: 45;
    }

    &>.top {
      rotate: 45deg;
    }

    &>.bottom {
      rotate: -45deg;
    }
  }
}
</style>