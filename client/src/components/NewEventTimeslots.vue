<template>
  <div class="box">
    <label class="box__title">Timeslots</label>
    <div v-for="option in options" v-bind:key="option.id" class="box__option">
      <input
        type="checkbox"
        name="timeslot"
        v-bind:id="option.id"
        class="box__input"
        v-on:change="toggleOption(option.id)"
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
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle-option"],
  methods: {
    toggleOption(id) {
      this.$emit("toggle-option", id);
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
