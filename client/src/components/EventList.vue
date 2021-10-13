<template>
  <base-block v-for="event in events" v-bind:key="event._id" class="container">
    <div class="event">
      <div class="event__info">
        <h2 class="event__title">{{ event.title }}</h2>
        <p class="event__speaker">presented by {{ event.speaker }}</p>
      </div>
      <div class="event__subjects">
        <div v-for="subject in event.subjects" class="event__subject">
          {{ subject }}
        </div>
      </div>
      <base-button>Add participant</base-button>
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
    async getAllEvents() {
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
    this.getAllEvents();
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_abstracts.scss";
.event {
  @include basic-grid(1, 1rem);
  &__title {
    margin-bottom: 0.5rem;
  }
  &__speaker {
    color: $color-grey;
    text-transform: uppercase;
  }
  &__subjects {
    display: flex;
    gap: 0.5rem;
  }
  &__subject {
    padding: 0.5em 1em;
    background-color: $color-green-light;
    border-radius: 2em;
    color: $color-green-dark;
  }
}
</style>
