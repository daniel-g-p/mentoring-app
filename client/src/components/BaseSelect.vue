<template>
  <div class="input">
    <label v-bind:for="id" class="input__label">{{ label }}</label>
    <select class="input__select" v-bind:id="id" v-bind:value="modelValue" v-on:change="setValue">
      <option
        v-for="option in options"
        v-bind:key="option.id"
        v-bind:value="option.id"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    setValue($event) {
      this.$emit("update:modelValue", $event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_abstracts.scss";
.input {
  position: relative;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  &__label {
    position: absolute;
    top: 0;
    left: 0.75rem;
    background-color: $color-white;
    font-size: 0.75rem;
    padding: 0.25rem;
    text-transform: uppercase;
    color: $color-grey;
    font-weight: 700;
  }
  &__select {
    border: 0.125rem solid $color-green-light;
    border-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    transition: border-color 0.25s ease;
    &:focus,
    &:hover {
      border-color: $color-green-dark;
    }
  }
}
</style>
