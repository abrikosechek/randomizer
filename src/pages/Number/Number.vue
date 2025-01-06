<template>
  <div class="page">
    <h1>
      Random number
    </h1>

    <div class="card card-params container-glass">
      <h1 class="card__title">
        Parameters
      </h1>

      <Input class="card-params__amount" placeholder="results amount" v-model:value="resultsAmount"
        v-model:warning="resultsAmountWarning" number />

      <div class="card-params__inputs">
        <Input class="card-params__inputs__item" placeholder="from" v-model:value="firstValue"
          v-model:warning="firstValueWarning" number />
        <Input class="card-params__inputs__item" placeholder="to" v-model:value="secondValue"
          v-model:warning="secondValueWarning" number />
      </div>

      <Button class="card-params__button" @click="generate()">
        Generate
      </Button>
    </div>

    <div v-if="generatedList.length" class="card card-results container-glass">
      <div class="card-results__header">
        <h2 class="card__title">
          Results
          <span v-if="generatedList.length > 1" class="card__title__description">
            (avg: {{ generatedListAverage }})
          </span>
        </h2>

        <button class="card-results__header__button" @click="copyResults">
          <IconCopy class="card-results__header__button__icon" />
          <p>copy</p>
        </button>
      </div>

      <div class="card-results__list">
        <p v-for="(item, index) in generatedList" :key="index" class="card-results__list__item">
          {{ item }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useWarningsStore } from "@/store/warnings"
import { IconCopy } from "@/assets/icons"
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";

const warningsStore = useWarningsStore()

const firstValue = ref(null)
const secondValue = ref(null)
const resultsAmount = ref("1")

const firstValueWarning = ref(null)
const secondValueWarning = ref(null)
const resultsAmountWarning = ref(null)

const generatedList = ref([])
const generatedListAverage = ref(null)

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generate = () => {
  let returnError = false

  console.log(resultsAmount.value === "")

  if (!firstValue.value) {
    returnError = true
    firstValueWarning.value = "field can't be empty"
  }
  if (!secondValue.value) {
    returnError = true
    secondValueWarning.value = "field can't be empty"
  }
  if (!resultsAmount.value) {
    returnError = true
    resultsAmountWarning.value = "field can't be empty"
  } else if (Number(resultsAmount.value) < 1) {
    returnError = true
    resultsAmountWarning.value = "value must be higher"
  } else if (Number(resultsAmount.value) > 1000) {
    returnError = true
    resultsAmountWarning.value = "max value is 1000"
  }

  if (returnError) return

  const firstValueNumber = Number(firstValue.value)
  const secondValueNumber = Number(secondValue.value)
  const resultsAmountNumber = Number(resultsAmount.value)
  const lowerInputValue = Math.min(firstValueNumber, secondValueNumber)
  const higherInputValue = Math.max(firstValueNumber, secondValueNumber)

  generatedList.value = []

  for (let i = 0; i < Number(resultsAmountNumber); i++) {
    generatedList.value.push(getRandomNumber(lowerInputValue, higherInputValue))
  }

  const sum = generatedList.value.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  generatedListAverage.value = Math.round(sum / generatedList.value.length)

  warningsStore.createWarning({
    text: "Successfully generated",
    color: "success",
  })
}

const copyResults = async () => {
  const textToCopy = generatedList.value.join(" ")

  try {
    await navigator.clipboard.writeText(textToCopy)
    warningsStore.createWarning({
      text: "Copied results",
      color: "success",
    })
  } catch (err) {
    warningsStore.createWarning({
      text: "Failed to copy",
      color: "success",
    })
    console.log("Copying error:\n", err)
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

.card-params {
  &__amount {
    width: 50%;
    margin: 0 auto;
  }

  &__inputs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
    width: 100%;
    margin-top: 12px;
  }

  &__button {
    width: 100%;
    margin-top: 6px;
  }
}

.card-results {
  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    width: 100%;

    &__button {
      flex: 0 0 auto;
      display: flex;
      align-items: flex-start;
      gap: 4px;
      padding: 1px 4px;
      background: transparent;
      border: 0;
      border-radius: 6px;
      box-shadow: 0 0 18px rgba(0, 0, 0, .2);
      color: var(--text);
      border: 1px solid var(--primary);
      font-size: 16px;
      cursor: pointer;

      &__icon {
        width: 18px;
        height: 18px;
        stroke: white;
      }

      & p {
        line-height: 1em;
      }
    }
  }

  &__list {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    width: 100%;

    &__item {
      padding: 2px 3px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      line-height: 1em;
      white-space: pre-wrap;
      font-weight: 200;
    }
  }
}
</style>