<template>
  <Header />

  <div class="layout">
    <div class="layout__nav">
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
@use "@/assets/styles/imports/breakpoints" as *;

main {
  width: 100%;
}

.layout {
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-areas: "nav main";
  margin-top: 15px;

  &__nav {
    grid-area: nav;
  }

  &>main {
    grid-area: main;
  }
}

@include breakpoint-tablet {
  .layout {
    grid-template-columns: 1fr;
    grid-template-areas: "main";

    &__nav {
      display: none !important;
    }
  }
}
</style>
