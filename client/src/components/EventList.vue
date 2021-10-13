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
          this.eventList = events.map((event) => {
            for (let i = 0; i < event.timeslots.length; i++) {
              event.timeslots[i].id = `slot${i + 1}`;
            }
            return event;
          });
        }
      } catch (error) {
        console.log(error);
        alert("Failed to retrieve data");
      }
    },
  },
  mounted() {
    this.getAllEvents();
  },
};
</script>
