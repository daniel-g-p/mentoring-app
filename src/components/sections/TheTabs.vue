<template>
  <div class="container">
    <button
      v-for="tab in tabOptions"
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
  data() {
    return {
      tabOptions: [
        { id: "add", label: "Add" },
        { id: "events", label: "Events" },
        { id: "booked", label: "Booked" },
      ],
      activeTab: "add",
    };
  },
  methods: {
    setTab(tab) {
      this.activeTab = tab;
      this.$emit("set-tab", this.activeTab);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/_abstracts.scss";
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
