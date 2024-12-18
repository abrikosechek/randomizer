<template>
  <div class="page">

    <div class="card card-params">
      <h1 class="card__title">
        Random number
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

    <div v-if="generatedList.length" class="card card-results">
      <h2 class="card__title">
        Results
        <span class="card__title__description">(avg: {{ generatedListAverage }})</span>
      </h2>

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
import { useWarningsStore } from "@/store/warnings"
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

  &__title {
    margin-bottom: 12px;
    font-size: 20px;
    font-weight: 500;
    line-height: 1em;

    &__description {
      opacity: 0.7;
      font-size: 13px;
    }
  }
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
  &__list {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    width: 100%;

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