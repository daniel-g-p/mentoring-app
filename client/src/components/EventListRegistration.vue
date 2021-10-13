<template>
  <form class="form">
    <div class="form__content" v-if="formActive">
      <base-select
        id="timeslot"
        label="Timeslot"
        v-bind:options="filteredTimeslots"
        v-model="timeslot"
      ></base-select>
      <base-type-input
        v-model="name"
        v-bind="parameters.name"
      ></base-type-input>
      <base-type-input
        v-model="email"
        v-bind="parameters.email"
      ></base-type-input>
      <base-button v-bind:style="'outline'" v-on:click.prevent="cancelButton"
        >Cancel</base-button
      >
    </div>
    <base-button v-on:click.prevent="submitButton">Add participant</base-button>
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
    formActive: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["activate-form", "deactivate-form"],
  data() {
    return {
      parameters: {
        name: {
          id: "name",
          label: "Name",
          mandatory: true,
          errorMessage: "Please enter your name.",
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
      timeslot: "",
    };
  },
  computed: {
    filteredTimeslots() {
      const options = this.timeslots.filter((timeslot) => {
        if (!timeslot.maxAttendance) {
          return true;
        }
        return timeslot.maxAttendance > timeslot.attendees;
      });
      return options.map((option) => {
        option.label = `${option.hours < 10 ? "0" : ""}${option.hours}:${
          option.minutes < 10 ? "0" : ""
        }${option.minutes} (${option.duration} minutes)`;
        return option;
      });
    },
  },
  methods: {
    resetFormData() {
      this.name = "";
      this.email = "";
      this.timeslot = "";
    },
    submitButton() {
      if (!this.formActive) {
        this.$emit("activate-form");
      } else {
        alert("Submitting...");
      }
    },
    cancelButton() {
        this.resetFormData();
      this.$emit("deactivate-form");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_abstracts.scss";
.form {
  @include basic-grid(1, 1rem);
  &__content {
    @include basic-grid(1, 1rem);
  }
}
</style>
