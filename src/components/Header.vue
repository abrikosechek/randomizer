<template>
  <div class="header-space" />

  <div class="header-wrapper container-glass" :class="{ active: menuActive }">
    <header class="header">
      <router-link to="/" class="header__logo">
        Randomka
      </router-link>
      <div class="header__buttons">

        <a href="https://github.com/abrikosechek/randomizer" target="_blank" class="header__buttons__github">
          <IconGithubWhite />
        </a>


        <IconBurgerMenu class="header__buttons__menu" :active="menuActive" @click="menuActive = !menuActive" />
      </div>
    </header>

    <nav class="menu">
      <router-link v-for="link in pages" :key="link.path" :to="link.path" @click="menuActive = false">
        {{ link.text }}
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { pages } from "@/consts";
import { IconGithubWhite, IconBurgerMenu } from "@/assets/icons"

const menuActive = ref(false)
</script>

<style scoped lang='scss'>
@use "@/assets/styles/imports/breakpoints" as *;

.header-space {
  width: 100%;
  height: 50px;
}

.header-wrapper {
  display: grid;
  grid-template-rows: auto 1fr;
  position: fixed;
  left: 15px;
  right: 15px;
  top: 15px;
  z-index: 2;
  height: 50px;
  overflow: hidden;
  transition: 0.3s ease-out;

  &.active {
    height: calc(100dvh - 15px*2)
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 15px;

  &__logo {
    font-size: 28px;
    font-weight: 400;
    text-decoration: none;
    user-select: none;

    &>span {
      color: #41B883;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;

    &>* {
      flex: 0 0 auto;
    }

    &__menu {
      display: none;
      width: 25px;
      height: 25px;
      fill: white;
      cursor: pointer;
    }

    &__github {
      width: 28px;
      height: 28px;
    }
  }
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 15px;
  overflow: auto;
  border-top: 1px solid #ffffff30;

  &>a {
    text-decoration: none;
    color: #ffffffa4;
    transition: 0.2s;
    font-size: 30px;
    line-height: 1em;
    user-select: none;

    &.router-link-active {
      font-size: 34px;
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

@include breakpoint-tablet {
  .header {
    &__buttons {
      &__menu {
        display: unset;
      }
    }
  }
}
</style>