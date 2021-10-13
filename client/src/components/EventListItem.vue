<template>
  <base-block class="event">
    <div>
      <h2 class="event__title">{{ title }}</h2>
      <p class="event__speaker">presented by {{ speaker }}</p>
    </div>
    <div class="event__subjects">
      <div v-for="subject in subjects" class="event__subject">
        {{ subject }}
      </div>
    </div>
    <event-list-registration
      v-bind:eventId="_id"
      v-bind:timeslots="timeslots"
      v-bind:formActive="formActive"
      v-on:activate-form="toggleForm"
      v-on:deactivate-form="toggleForm"
    ></event-list-registration>
  </base-block>
</template>

<script>
import EventListRegistration from "./EventListRegistration.vue";
export default {
  components: {
    EventListRegistration,
  },
  props: {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    speaker: {
      type: String,
      required: true,
    },
    subjects: {
      type: Array,
      required: true,
    },
    timeslots: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      formActive: false,
    };
  },
  methods: {
    toggleForm() {
      this.formActive = !this.formActive;
    },
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
    flex-wrap: wrap;
  }
  &__subject {
    padding: 0.5em 1em;
    background-color: $color-green-light;
    border-radius: 2em;
    color: $color-green-dark;
  }
}
</style>
