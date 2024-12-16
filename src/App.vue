<template>
  <Header />

  <main>
    <RouterView />
  </main>

  <Warnings />
</template>

<script setup>
import Header from '@/components/Header.vue';
import Warnings from '@/components/Warnings.vue';
</script>

<style scoped>
main {
  width: 100%;
  padding: 12px;
}
</style>
