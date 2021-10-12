<template>
  <base-block class="container">
    <h2>Event List</h2>
    <div v-for="event in events" v-bind:key="event._id">
      {{ event._id }}
    </div>
  </base-block>
</template>

<script>
export default {
  data() {
    return {
      events: [],
    };
  },
  methods: {
    async getEvents() {
      try {
        const res = await fetch(`${this.$server}/events`);
        const events = await res.json();
        if (!events.length) {
          alert("No events were found");
        } else {
          this.events = events;
        }
      } catch {
        alert("Failed to retrieve data");
      }
    },
  },
  mounted() {
    this.getEvents();
  },
};
</script>
