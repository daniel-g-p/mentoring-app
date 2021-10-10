<template>
  <div v-if="items.length" class="list">
    <div
      v-for="item in items"
      v-bind:key="item"
      class="list__item"
      v-on:click="removeSubject(item)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        class="list__icon"
      >
        <path
          d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
        />
      </svg>
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  emits: ["remove-subject"],
  methods: {
    removeSubject(item) {
      this.$emit("remove-subject", item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_abstracts.scss";
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  &__item {
    color: $color-white;
    background-color: $color-green-dark;
    padding: 0.5rem 1rem 0.5rem 0.75rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
    transition: color 0.25s ease;
    &:hover,
    &:focus {
      color: $color-green-light;
    }
  }
  &__icon {
    width: 0.75rem;
    height: 0.75rem;
    fill: currentColor;
  }
}
</style>
