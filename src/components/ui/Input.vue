<template>
  <div class="input" :class="{ active: isActive, warning }">
    <div class="input__container">
      <p v-if="placeholder" class="input__container__placeholder">{{ placeholder }}</p>

      <input ref="inputRef" class="input__container__input" placeholder="" type="text" :value="value"
        :inputmode="inputMode" @input="onInput" @focus="focused = true" @blur="focused = false" />
      <div class="input__container__trigger" @click="inputRef.focus()" />
    </div>

    <p v-if="warning" class="input__warning">{{ warning }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: null
  },
  value: {
    type: String,
    default: null
  },
  warning: {
    type: String,
    default: null
  },
  number: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["update:value", "update:warning"])

const inputRef = ref(null)
const focused = ref(false)

const inputMode = computed(() => props.number ? "numeric" : "text")
const isActive = computed(() => focused.value || props.value)

function validateNumbers(value) {
  return `${value}`.replace(/\D/g, '');
}

const onInput = (event) => {
  const inputValue = event.target.value

  emit("update:warning", null)

  if (props.number) {
    const validatedInputValue = validateNumbers(inputValue)
    event.target.value = validatedInputValue
    emit("update:value", validatedInputValue)
  } else {
    emit("update:value", inputValue)
  }
}
</script>

<style scoped lang='scss'>
$transition-duration: 200ms;

.input {
  &__container {
    position: relative;
    height: 32px;
    background: #FFFFFF20;
    border: 1px solid #FFFFFF40;
    border-radius: 5px;

    &__placeholder {
      will-change: transform;
      position: absolute;
      left: 6px;
      z-index: 1;
      transform-origin: left;
      transform: translate(0, 50%) scale(1);
      color: #ffffffec;
      font-size: 15px;
      line-height: 1em;
      font-weight: 500;
      cursor: text;
      transition:
        top $transition-duration,
        transform $transition-duration;
    }

    &__input {
      position: absolute;
      left: 0;
      bottom: 2px;
      z-index: 2;
      width: 100%;
      height: unset;
      padding: 0 6px;
      background: transparent;
      backface-visibility: hidden;
      border: 0px;
      outline: 0px;
      font-weight: 600;
      color: #FFF;
    }

    &__trigger {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      cursor: text;
    }
  }

  &__warning {
    color: var(--error);
    font-size: 13px;
  }

  &.active {
    & .input {
      &__container {
        &__placeholder {
          color: #ffffffd2;
          transform: translate(0, 0) scale(0.85);
        }
      }
    }
  }

  &.warning {
    & .input {
      &__container {
        border: 1px solid var(--error);

        &__placeholder {
          color: var(--error);
        }
      }
    }
  }
}
</style>