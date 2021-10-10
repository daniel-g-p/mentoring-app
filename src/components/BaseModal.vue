<template>
  <teleport to="body">
    <dialog class="modal" open>
      <base-block class="modal__content">
        <h2 class="modal__title">
          <slot name="title"></slot>
        </h2>
        <p class="modal__text">
          <slot name="message"></slot>
        </p>
        <div class="modal__buttons">
          <slot name="buttons"></slot>
        </div>
      </base-block>
    </dialog>
  </teleport>
</template>

<style lang="scss" scoped>
@import "../styles/_abstracts.scss";
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $color-shadow;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(0.125rem);
  color: $color-green-dark;
  animation: modal-appear 0.25s ease;
  @keyframes modal-appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  &__content {
    padding: 1rem;
    width: 20rem;
    margin: 2rem;
    background-color: $color-white;
    @include basic-grid(1, 0.75rem);
    animation: content-appear 0.25s ease;
    @keyframes content-appear {
      from {
        transform: scale(0.9)
      }
      to {
        transform: scale(1);
      }
    }
  }
  &__text {
    line-height: 1.25;
  }
  &__buttons {
    display: flex;
    gap: 0.5rem;
  }
}
</style>
