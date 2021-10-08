<template>
  <base-block class="container">
    <h2 class="heading">New Event</h2>
    <form action="/" class="form">
      <type-input
        id="speaker"
        label="speaker"
        v-bind:mandatory="true"
        errorMessage="Please enter the speaker's name."
        v-model="speaker"
      ></type-input>
      <type-input
        id="title"
        label="title"
        v-bind:mandatory="true"
        errorMessage="Please enter an event title."
        v-model="title"
      ></type-input>
      <div>
        <type-input
          id="subjects"
          label="subjects"
          v-model="subjectInput"
          v-on:keydown.enter="addSubject"
        ></type-input>
        <div v-if="subjectInput" class="subjects__message">
          Press "Enter" to add this subject.
        </div>
        <div v-if="subjects.length" class="subjects__list">
          <div
            v-for="subject in subjects"
            v-bind:key="subject"
            class="subjects__item"
            v-on:click="removeSubject(subject)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              class="subjects__icon"
            >
              <path
                d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
              />
            </svg>
            <span> {{ subject }}</span>
          </div>
        </div>
      </div>
    </form>
  </base-block>
</template>

<script>
export default {
  data() {
    return {
      speaker: "",
      title: "",
      subjectInput: "",
      subjects: [],
    };
  },
  methods: {
    addSubject() {
      if (!this.subjects.includes(this.subjectInput)) {
        this.subjects.push(this.subjectInput);
      }
      this.subjectInput = "";
    },
    removeSubject(subject) {
      const index = this.subjects.findIndex((item) => item === subject);
      this.subjects.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/_abstracts.scss";
.container {
  border: 0.125rem solid $color-grey;
}
.heading {
  margin-bottom: 1rem;
}
.form {
  display: grid;
  gap: 1rem;
}
.subjects {
  &__message {
    font-size: 0.75rem;
    margin-top: 0.25rem;
    color: $color-grey;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
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
    &:hover {
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
