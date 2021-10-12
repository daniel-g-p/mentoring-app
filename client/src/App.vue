<template>
  <div class="app">
    <the-header></the-header>
    <the-tabs v-bind:tabs="tabs" v-bind:activeTab="activeTab" v-on:set-tab="setTab"></the-tabs>
    <component :is="activeTab" v-on:add-event="addEvent"></component>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheTabs from "./components/TheTabs.vue";
import NewEvent from "./components/NewEvent.vue";
import EventList from "./components/EventList.vue";
import BookedEvents from "./components/BookedEvents.vue";
export default {
  components: {
    TheHeader,
    TheTabs,
    NewEvent,
    EventList,
    BookedEvents,
  },
  data() {
    return {
      activeTab: "new-event",
      tabs: [
        { id: "new-event", label: "New" },
        { id: "event-list", label: "Events" },
        { id: "booked-events", label: "Booked" },
      ],
    };
  },
  methods: {
    setTab(tab) {
      this.activeTab = tab;
    },
    addEvent(id) {
      console.log(`New Event: ${id}`);
    }
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
