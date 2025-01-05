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
$transition-duration: 200ms;

.burger-menu {
  &>.line {
    transform-origin: center;
  }

  &>.top,
  &>.bottom {
    transition:
      y $transition-duration ease-in $transition-duration,
      rotate $transition-duration ease-in;
  }

  &>.middle {
    transition:
      opacity 0ms $transition-duration;
  }

  &.active {

    &>.top,
    &>.bottom {
      transition:
        y $transition-duration ease-in,
        rotate $transition-duration ease-in $transition-duration;
    }

    &>.middle {
      opacity: 0; 
    }

    &>.top {
      y: 45px;
      rotate: 45deg;
    }

    &>.bottom {
      y: 45px;
      rotate: -45deg;
    }
  }
}
</style>