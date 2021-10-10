<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
@import "../styles/abstracts.scss";
.button {
  padding: 0.5rem 1rem;
  text-align: center;
  background-color: $color-green-dark;
  color: $color-white;
  font-weight: 700;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: transform 0.25s ease;
  &:hover {
    transform: translateY(-0.125rem);
  }
}
</style>
