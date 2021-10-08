<template>
  <div class="app">
    <the-header></the-header>
    <the-tabs v-on:set-tab="setTab"></the-tabs>
    <component :is="tabComponent"></component>
  </div>
</template>

<script>
import TheHeader from "./components/sections/TheHeader.vue";
import TheTabs from "./components/sections/TheTabs.vue";
import NewEvent from "./components/sections/NewEvent.vue";
import AllEvents from "./components/sections/AllEvents.vue";
import BookedEvents from "./components/sections/BookedEvents.vue";
export default {
  components: {
    TheHeader,
    TheTabs,
    NewEvent,
    AllEvents,
    BookedEvents,
  },
  data() {
    return {
      activeTab: "add",
    };
  },
  computed: {
    tabComponent() {
      switch (this.activeTab) {
        case "add":
          return "new-event";
        case "events":
          return "all-events";
        case "booked":
          return "booked-events";
        default:
          return "all-events";
      }
    },
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
  color: $color-green-dark;
}
.app {
  display: grid;
  gap: 1rem;
  max-width: 40rem;
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
