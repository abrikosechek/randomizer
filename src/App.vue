<template>
  <Header />

  <div class="layout">
    <div>
      <Nav />
    </div>
    <main>
      <RouterView />
    </main>
  </div>

  <Warnings />
</template>

<script setup>
import Header from '@/components/Header.vue';
import Nav from '@/components/Nav.vue';
import Warnings from '@/components/Warnings.vue';
</script>

<style scoped lang="scss">
main {
  width: 100%;
}

.layout {
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-areas: "nav main";
  margin-top: 15px;

  &>nav {
    grid-area: nav;
  }

  &>main {
    grid-area: main;
  }
}
</style>
