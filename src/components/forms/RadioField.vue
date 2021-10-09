<template>
  <div class="box">
    <label class="box__name">{{ label }}</label>
    <div v-for="option in options" v-bind:key="option.id" class="box__option">
      <input
        v-bind:type="type"
        v-bind:name="id"
        v-bind:id="option.id"
        v-bind:value="modelValue"
        v-on:change="setValue"
        class="box__input"
      />
      <label v-bind:for="option.id" class="box__label">{{
        option.label
      }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "checkbox",
      validator(value) {
        return ["radio", "checkbox"].includes(value);
      },
    },
    options: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    setValue($event) {
      console.log($event);
      this.$emit("update:modelValue", $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/_abstracts.scss";
.box {
  position: relative;
  border: 0.125rem solid $color-green-light;
  border-radius: 0.25rem;
  padding: 1.25rem 1rem;
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
  gap: 1rem;
  &__name {
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
  }
}
</style>
