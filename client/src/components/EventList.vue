<template>
  <event-list-item
    v-for="eventItem in eventList"
    v-bind:key="eventItem._id"
    v-bind="eventItem"
  ></event-list-item>
</template>

<script>
import EventListItem from "./EventListItem.vue";

export default {
  components: {
    EventListItem,
  },
  data() {
    return {
      eventList: [],
    };
  },
  methods: {
    async getAllEvents() {
      try {
        const res = await fetch(`${this.$server}/events`);
        const events = await res.json();
        if (!events.length) {
          alert("No events were found");
        } else {
          this.eventList = events;
        }
      } catch {
        alert("Failed to retrieve data");
      }
    },
  },
  mounted() {
    this.getAllEvents();
  },
};
</script>
