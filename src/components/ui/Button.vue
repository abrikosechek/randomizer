<template>
  <button :class="{ disabled }">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang='scss'>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  padding: 2px 8px;
  background: var(--primary);
  border: 0px;
  border-radius: 2px;
  color: var(--text);
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  &:not(.disabled) {
    &:hover {
      background: var(--primary-hover);
    }

  }

  &.disabled {
    opacity: 0.4;
    cursor: default;
  }
}
</style>