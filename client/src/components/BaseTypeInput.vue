<template>
  <div class="input">
    <label v-bind:for="id" class="input__label">{{ label }}</label>
    <input
      v-bind:type="type"
      v-bind:id="id"
      v-bind:min="min"
      v-bind:max="max"
      class="input__data"
      v-bind:value="modelValue"
      v-on:input="setValue"
    />
    <div v-if="errorVisible" class="input__error">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "number", "email"].includes(value);
      },
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "Please fill in this field",
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    modelValue: {
      required: true,
    },
  },
  data() {
    return {
      errorVisible: false,
      emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    };
  },
  emits: ["update:modelValue"],
  methods: {
    setValue($event) {
      const value = $event.target.value;
      if (this.mandatory) {
        this.errorVisible = !value;
      }
      if (this.type === "number") {
        const numberValue = parseInt(value);
        this.errorVisible = numberValue > this.max || numberValue < this.min;
      } else if (this.type === "email") {
        const emailValid = value.match(this.emailRegex);
        this.errorVisible = !emailValid;
      }
      this.$emit("update:modelValue", value);
    },
  },
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
  &__data {
    border: 0.125rem solid $color-green-light;
    border-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    transition: border-color 0.25s ease;
    &:focus,
    &:hover {
      border-color: $color-green-dark;
    }
  }
  &__error {
    margin-top: 0.25rem;
    color: $color-grey;
    font-size: 0.75rem;
  }
}
</style>
