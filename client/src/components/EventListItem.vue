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
    <base-button>Add participant</base-button>
  </base-block>
</template>

<script>
import BaseBlock from "./BaseBlock.vue";
export default {
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