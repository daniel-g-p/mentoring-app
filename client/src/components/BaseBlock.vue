<template>
  <section class="section">
    <slot></slot>
  </section>
</template>

<style lang="scss" scoped>
@import "../styles/_abstracts.scss";
.section {
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.5rem $color-shadow;
}
</style>
