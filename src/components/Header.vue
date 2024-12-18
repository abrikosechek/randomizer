<template>
  <header class="header">
    <router-link to="/" class="header__logo">
      Randomka
    </router-link>
    <a href="" class="header__github">
      <IconGithubWhite />
    </a>
  </header>
  <nav class="nav">
    <router-link v-for="link in links" :key="link.path" :to="link.path">
      {{ link.text }}
    </router-link>
  </nav>
</template>

<script setup>
import { IconGithubWhite } from "@/assets/icons"

const links = [
  {
    text: "Number",
    path: "number"
  },
  {
    text: "Dice",
    path: "dice"
  }
]
</script>

<style scoped lang='scss'>
.header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 12px;
  background: var(--bg-light);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, .1);

  &__logo {
    color: var(--primary);
    font-size: 28px;
    font-weight: 600;
    text-decoration: none;

    &>span {
      color: #41B883;
    }
  }

  &__github {
    width: 28px;
    height: 28px;
  }
}

nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
  height: 30px;
  padding: 3px 8px;
  background: #252525;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, .05);

  &>a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 12px;
    border-radius: 2px;
    text-decoration: none;
    font-weight: 600;
    transition: 0.2s;

    &:not(.router-link-active) {
      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }
    }

    &.router-link-active {
      background: rgba(255, 255, 255, 0.1);
      cursor: default;
    }
  }
}
</style>