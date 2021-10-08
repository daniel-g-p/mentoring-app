<template>
  <div class="app">
    <the-header></the-header>
    <the-tabs v-on:set-tab="setTab"></the-tabs>
  </div>
</template>

<script>
import TheHeader from "./components/sections/TheHeader.vue";
import TheTabs from "./components/sections/TheTabs.vue";
export default {
  components: {
    TheHeader,
    TheTabs,
  },
  data() {
    return {
      activeTab: "add",
    };
  },
  methods: {
    setTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style lang="scss">
@import "./styles/_abstracts.scss";
@include reset-css();
@include font-face("Roboto Slab", "bold", 700);
@include font-face("Roboto Slab", "regular", 400);
html {
  font: 400 100%/1 "Roboto Slab", sans-serif;
}
.app {
  display: grid;
  gap: 1rem;
  max-width: 48rem;
  margin: 0 auto;
  padding: 1rem;
  @include responsive($screen-tablet-s) {
    padding: 2rem;
  }
  @include responsive($screen-desktop-s) {
    padding: 3rem;
  }
}
</style>
