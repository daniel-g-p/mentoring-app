<template>
  <div class="box">
    <label class="box__title">Timeslots</label>
    <div v-for="option in options" v-bind:key="option.id" class="box__option">
      <input
        type="checkbox"
        name="timeslot"
        v-bind:id="option.id"
        v-bind:value="option.id"
        class="box__input"
        v-model="selected"
        v-on:change="toggleTimeslot(option.id)"
      />
      <label v-bind:for="option.id" class="box__label">
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formActive: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["toggle-timeslot", "reset-form"],
  data() {
    return {
      options: [
        {
          id: "slot1",
          label: "08:00 - 08:30",
          time: {
            hours: 8,
            minutes: 0,
            duration: 30,
          },
        },
        {
          id: "slot2",
          label: "08:45 - 09:15",
          time: {
            hours: 8,
            minutes: 45,
            duration: 30,
          },
        },
        {
          id: "slot3",
          label: "09:30 - 10:00",
          time: {
            hours: 9,
            minutes: 30,
            duration: 30,
          },
        },
        {
          id: "slot4",
          label: "10:15 - 10:45",
          time: {
            hours: 10,
            minutes: 15,
            duration: 30,
          },
        },
        {
          id: "slot5",
          label: "11:00 - 11:30",
          time: {
            hours: 11,
            minutes: 0,
            duration: 30,
          },
        },
        {
          id: "slot6",
          label: "11:45 - 12:15",
          time: {
            hours: 11,
            minutes: 45,
            duration: 30,
          },
        },
      ],
      selected: [],
    };
  },
  methods: {
    toggleTimeslot(id) {
      const { time } = this.options.find((option) => option.id === id);
      this.$emit("toggle-timeslot", { id, time });
    },
  },
  watch: {
    formActive(value) {
      if (!value) {
        this.selected = [];
        this.$emit("reset-form");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_abstracts.scss";
.box {
  position: relative;
  border: 0.125rem solid $color-green-light;
  border-radius: 0.25rem;
  padding: 1.25rem 1rem;
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
  gap: 1rem;
  &__title {
    position: absolute;
    top: 0;
    left: 0.75rem;
    background-color: $color-white;
    font-size: 0.75rem;
    padding: 0.25rem;
    text-transform: uppercase;
    color: $color-grey;
    font-weight: 700;
    transform: translateY(-0.75rem);
  }
  &__option {
    width: 100%;
    display: flex;
  }
  &__input {
    display: none;
    &:checked + label {
      border-color: $color-green-dark;
    }
  }
  &__label {
    width: 100%;
    background-color: $color-green-light;
    text-align: center;
    padding: 0.25rem 0.5rem;
    border: 0.125rem solid $color-green-light;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: transform 0.25s ease;
    &:hover,
    &:focus {
      transform: translateY(-0.125rem);
    }
  }
}
</style>
