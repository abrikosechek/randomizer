<template>
  <Header />
  
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import Header from '@/components/Header.vue';
</script>

<style scoped>
main {
  width: 100%;
}

main {
  padding: 12px;
}
</style>
