<template>
  <div class="page">
    <div class="card card-params">
      <Input class="card-params__amount" placeholder="Results amount" v-model:value="resultsAmount" number />

      <div class="card-params__inputs">
        <Input placeholder="from" v-model:value="firstValue" number />
        <Input placeholder="to" v-model:value="secondValue" number />
      </div>

      <Button class="card-params__button" @click="generate()">
        Generate
      </Button>
    </div>

    <div v-if="generatedList.length" class="card card-results">
      <h2 class="card-results__title">Results:</h2>

      <div class="card-results__list">
        <div v-for="(item, index) in generatedList" :key="index" class="card-results__list__item">
          <p class="card-results__list__item__text">{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";

const firstValue = ref(null)
const secondValue = ref(null)
const resultsAmount = ref("1")
const generatedList = ref([])

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generate = () => {
  if (!firstValue.value || !secondValue.value)
    return

  const firstValueNumber = Number(firstValue.value)
  const secondValueNumber = Number(secondValue.value)
  const resultsAmountNumber = Number(resultsAmount.value)
  const lowerInputValue = Math.min(firstValueNumber, secondValueNumber)
  const higherInputValue = Math.max(firstValueNumber, secondValueNumber)

  generatedList.value = []

  for (let i = 0; i < Number(resultsAmountNumber); i++) {
    generatedList.value.push(getRandomNumber(lowerInputValue, higherInputValue))
  }
}
</script>

<style scoped lang='scss'>
.page {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}

.card {
  width: 100%;
  padding: 14px;
  background: var(--bg-light);
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .2);
}

.card-params {
  &__amount {
    width: 50%;
    margin: 0 auto;
  }

  &__inputs {
    display: flex;
    gap: 6px;
    width: 100%;
    margin-top: 12px;

    &__item {
      flex: 1 1 auto;

      &__text {
        padding: 0 2px;
        font-size: 13px;
        line-height: 1em;
      }

      &__input {
        width: 100%;
        height: 24px;
        padding: 0 6px;
        background: var(--text);
        border: 0px;
        border-radius: 2px;
        outline: 0px;
        font-weight: 600;
      }
    }
  }

  &__button {
    width: 100%;
    margin-top: 6px;
  }
}

.card-results {
  &__title {
    font-size: 20px;
    font-weight: 500;
    line-height: 1em;
  }

  &__list {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 8px;

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px 6px;
      border-radius: 3px;
      box-shadow: 0px 0px 6px rgba(0, 0, 0, .4);

      &__text {
        line-height: 1em;
      }
    }
  }
}
</style>