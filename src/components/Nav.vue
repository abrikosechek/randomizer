<template>
  <nav class="container-glass">
    <router-link v-for="link in pages" :key="link.path" :to="link.path">
      {{ link.text }}
    </router-link>
  </nav>
</template>

<script setup>
import { pages } from "@/consts";
</script>

<style scoped lang='scss'>
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  width: 100%;
  padding: 10px 5px;

  &>a {
    text-decoration: none;
    color: #ffffffa4;
    transition: 0.2s;
    font-size: 20px;
    user-select: none;

    &.router-link-active {
      color: #FFFFFF;
      cursor: default;
    }

    &:not(.router-link-active) {
      &:hover {
        color: #FFFFFF;
      }
    }
  }
}
</style>