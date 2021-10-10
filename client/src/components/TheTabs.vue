<template>
  <div class="container">
    <button
      v-for="tab in tabs"
      v-bind:key="tab.id"
      class="tab"
      v-bind:class="{ 'tab--active': activeTab === tab.id }"
      v-on:click="setTab(tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
  },
  emits: ["set-tab"],
  methods: {
    setTab(tab) {
      this.$emit("set-tab", tab);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_abstracts.scss";
.container {
  @include basic-grid(3, 0.5rem);
}
.tab {
  border: 0.125rem solid $color-green-dark;
  border-radius: 0.25rem;
  padding: 0.25em 0.5em;
  cursor: pointer;
  transition: transform 0.25s ease;
  &:hover {
    transform: translateY(-0.125rem);
  }
  &--active {
    background-color: $color-green-light;
  }
}
</style>
