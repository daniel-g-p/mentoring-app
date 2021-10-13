<template>
  <form class="form" v-on:keydown.enter="$event.preventDefault()">
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
  <base-modal v-if="modal.open">
    <template v-slot:title>{{ modal.title }}</template>
    <template v-slot:message>{{ modal.text }}</template>
    <template v-slot:buttons>
      <base-button v-on:click="closeModal">Ok</base-button>
    </template>
  </base-modal>
</template>

<script>
export default {
  props: {
    eventId: {
      type: String,
      required: true,
    },
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
      emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      timeslot: "",
      modal: {
        open: false,
        title: "Error",
        text: "Something went wrong",
      },
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
        return this.$emit("activate-form");
      }
      if (!this.timeslot) {
        return this.openModal("Error", "Please select a timeslot.");
      } else if (!this.name) {
        return this.openModal("Error", "Please enter the participant's name.");
      } else if (!this.email || !this.email.match(this.emailRegex)) {
        return this.openModal("Error", "Please enter a valid email address.");
      }
      const timeslotData = this.filteredTimeslots.find((timeslot) => {
        return timeslot.id === this.timeslot;
      });
      const data = {
        eventId: this.eventId,
        name: this.name.trim(),
        email: this.email.trim(),
        timeslot: {
          hours: timeslotData.hours,
          minutes: timeslotData.minutes,
          duration: timeslotData.duration,
        },
      };
      this.submitForm(data);
    },
    cancelButton() {
      this.resetFormData();
      this.$emit("deactivate-form");
    },
    openModal(title = "Error", text = "Something went wrong.") {
      this.modal.title = title;
      this.modal.text = text;
      this.modal.open = true;
    },
    closeModal() {
      this.modal.open = false;
    },
    async submitForm(data) {
      try {
        const resJson = await fetch(`${this.$server}/events/registration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await resJson.json();
        console.log(res);
        this.openModal("Success", "Participant has been added to the event.");
      } catch {
        this.openModal("Error", "Failed to add participant to the event, please try again later.");
      }
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
