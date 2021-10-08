<template>
  <base-block class="header">
    <header>
      <h1 class="header__heading">Mentoring App</h1>
    </header>
  </base-block>
</template>

<style lang="scss" scoped>
@import "../../styles/_abstracts.scss";
.header {
  background-color: $color-blue;
  &__heading {
    text-align: center;
    text-transform: uppercase;
    font-size: 1.5rem;
    color: $color-white;
  }
}
</style>
