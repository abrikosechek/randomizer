<template>
  <div class="input" :class="{ active: isActive }">
    <p v-if="placeholder" class="input__placeholder">{{ placeholder }}</p>
    <input ref="inputRef" class="input__input" placeholder="" type="text" :value="value" @input="onInput"
      @focus="focused = true" @blur="focused = false" />
    <div class="input__trigger" @click="inputRef.focus()" />
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
  number: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["update:value"])

const inputRef = ref(null)
const focused = ref(false)

const isActive = computed(() => focused.value || props.value)

function validateNumbers(value) {
  return `${value}`.replace(/\D/g, '');
}

const onInput = (event) => {
  console.log(props.value)
  const inputValue = event.target.value

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
.input {
  position: relative;
  flex: 1 1 auto;
  height: 30px;
  background: var(--text);
  border-radius: 2px;

  &__placeholder {
    position: absolute;
    left: 6px;
    top: 50%;
    z-index: 1;
    transform: translateY(-50%);
    padding: 0 2px;
    color: rgb(92, 92, 92);
    font-size: 13px;
    line-height: 1em;
    font-weight: 600;
    cursor: text;
    transition: 0.2s;
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
    border: 0px;
    outline: 0px;
    font-weight: 600;
    caret-color: var(--primary);
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

  &.active {
    &>.input {
      &__placeholder {
        top: 2px;
        transform: translateY(0);
        font-size: 10px;
      }
    }
  }
}
</style>