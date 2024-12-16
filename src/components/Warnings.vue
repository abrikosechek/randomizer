<template>
  <div class="warnings">
    <TransitionGroup name="warning-slide">
      <div v-for="warning in warnings" :key="warning.id" :class="[warning.color]" class="warning"
        @click="removeWarningById(warning.id)">
        <p>{{ warning.text }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useWarningsStore } from "@/store/warnings"
const warningsStore = useWarningsStore()

const { warnings } = storeToRefs(warningsStore)

const removeWarningById = (id) => {
  warningsStore.removeWarning(id)
}
</script>

<style scoped lang='scss'>
.warnings {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  max-width: 270px;
}

.warning {
  position: relative;
  left: 0;
  width: 100%;
  padding: 8px 12px;
  opacity: 1;
  background: var(--bg-light);
  box-shadow: 0 0 8px rgba(0, 0, 0, .4);
  border-radius: 2px;
  cursor: pointer;
  transition: left 0.2s, transform 0.5s, opacity 0.5s;

  &:hover {
    left: -10px;
  }

  // colors
  &.success {
    border-left: 4px solid var(--success);
  }
}

.warning-slide-enter-from,
.warning-slide-leave-to {
  transform: translateX(150%);
  opacity: 0.5;
}
</style>