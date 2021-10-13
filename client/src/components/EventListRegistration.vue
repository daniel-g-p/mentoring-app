<template>
  <form class="form">
      <base-select id="timeslot" label="Timeslot" v-bind:options="timeslots"></base-select>
    <base-type-input v-model="name" v-bind="parameters.name"></base-type-input>
    <base-type-input
      v-model="email"
      v-bind="parameters.email"
    ></base-type-input>
  </form>
</template>

<script>
export default {
  props: {
    timeslots: {
      type: Array,
      required: true,
    },
    maxAttendance: {
      default: undefined,
    },
  },
  data() {
    return {
      parameters: {
        name: {
          id: "name",
          label: "Name",
          mandatory: true,
        },
        email: {
          type: "email",
          id: "email",
          label: "Email",
          mandatory: true,
          errorMessage: "Please enter a valid email address.",
        },
      },
      name: "",
      email: "",
      timeslot: {},
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_abstracts.scss";
.form {
  @include basic-grid(1, 1rem);
}
</style>
