<template>
  <div class="header-space" />
  <header class="container-glass header">
    <router-link to="/" class="header__logo">
      Randomka
    </router-link>
    <a href="https://github.com/abrikosechek/randomizer" target="_blank" class="header__github">
      <IconGithubWhite />
    </a>
  </header>
</template>

<script setup>
import { IconGithubWhite } from "@/assets/icons"

</script>

<style scoped lang='scss'>
.header-space {
  width: 100%;
  height: 50px;
}

.header {
  position: fixed;
  left: 15px;
  right: 15px;
  top: 15px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 15px;
  background: var(--bg-light);

  &__logo {
    font-size: 28px;
    font-weight: 400;
    text-decoration: none;
    user-select: none;

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
    user-select: none;

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