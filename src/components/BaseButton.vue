<template>
  <button class="button" v-bind:class="buttonClass">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    style: {
      type: String,
      default: "fill",
    },
  },
  computed: {
    buttonClass() {
      switch (this.style) {
        case "fill": {
          return { "button--fill": true };
        }
        case "outline": {
          return { "button--outline": true };
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/abstracts.scss";
.button {
  padding: 0.5rem 1rem;
  text-align: center;
  font-weight: 700;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: transform 0.25s ease;
  &:hover {
    transform: translateY(-0.125rem);
  }
  &--fill {
    background-color: $color-green-dark;
    color: $color-white;
  }
  &--outline {
    color: $color-green-dark;
    border: 0.125rem solid $color-green-dark;
  }
}
</style>
