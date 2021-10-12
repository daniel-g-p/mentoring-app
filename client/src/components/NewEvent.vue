<template>
  <base-block class="container">
    <h2 class="heading">New Event</h2>
    <form
      action="/"
      class="form"
      v-on:keydown.enter="preventSubmission"
      v-on:submit.prevent="submit"
      novalidate
    >
      <base-type-input
        v-bind="parameters.speaker"
        v-model="speaker"
      ></base-type-input>
      <base-type-input
        v-bind="parameters.title"
        v-model="title"
      ></base-type-input>
      <div>
        <base-type-input
          v-bind="parameters.subjects"
          v-model="subjectInput"
          v-on:keydown.enter="addSubject"
        ></base-type-input>
        <div v-if="subjectInput" class="form__message">
          Press "Enter" to add this subject.
        </div>
        <new-event-subject-list
          v-bind:items="subjects"
          v-on:remove-subject="removeSubject"
        ></new-event-subject-list>
      </div>
      <new-event-timeslots
        v-bind:formActive="formActive"
        v-on:toggle-timeslot="toggleTimeslot"
        v-on:reset-form="restartForm"
      ></new-event-timeslots>
      <base-type-input
        v-bind="parameters.maxAttendance"
        v-model="maxAttendance"
      >
      </base-type-input>
      <base-button>Submit</base-button>
    </form>
  </base-block>
  <base-modal v-if="modal.open">
    <template v-slot:title>{{ modal.title }}</template>
    <template v-slot:message>{{ modal.text }}</template>
    <template v-slot:buttons>
      <base-button v-on:click="closeModal">Ok</base-button>
    </template>
  </base-modal>
</template>

<script>
import NewEventSubjectList from "./NewEventSubjectList.vue";
import NewEventTimeslots from "./NewEventTimeslots.vue";

export default {
  components: {
    NewEventSubjectList,
    NewEventTimeslots,
  },
  emits: ["add-event"],
  data() {
    return {
      parameters: {
        speaker: {
          id: "speaker",
          label: "Speaker",
          mandatory: true,
          errorMessage: "Please enter the speaker's name.",
        },
        title: {
          id: "title",
          label: "title",
          mandatory: true,
          errorMessage: "Please enter an event title.",
        },
        subjects: {
          id: "subjects",
          label: "Subjects",
        },
        maxAttendance: {
          id: "maxAttendance",
          label: "Maximum Attendance",
          type: "number",
          min: 1,
          max: 100,
          errorMessage: "Maximum attendance must be between 1 and 100.",
        },
      },
      formActive: true,
      modal: {
        open: false,
        title: "Oops...",
        message: "Please fill in all required fields to create a new event.",
      },
      speaker: "",
      title: "",
      subjectInput: "",
      subjects: [],
      timeslots: [],
      maxAttendance: null,
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
    toggleTimeslot(timeslot) {
      const index = this.timeslots.findIndex((slot) => slot.id === timeslot.id);
      if (index === -1) {
        this.timeslots.push(timeslot);
      } else {
        this.timeslots.splice(index, 1);
      }
    },
    preventSubmission(event) {
      event.preventDefault();
    },
    openModal(title, text) {
      this.modal.title = title || "Oops";
      this.modal.text =
        text || "Please fill in all required fields to create a new event.";
      this.modal.open = true;
    },
    closeModal() {
      this.modal.open = false;
    },
    resetForm() {
      this.speaker = "";
      this.title = "";
      this.subjectInput = "";
      this.subjects = [];
      this.timeslots = [];
      this.maxAttendance = null;
    },
    restartForm() {
      this.formActive = true;
    },
    async submit() {
      const event = {
        speaker: this.speaker.trim(),
        title: this.title.trim(),
        subjects: this.subjects,
        timeslots: this.timeslots.map((timeslot) => timeslot.time),
        maxAttendance: parseInt(this.maxAttendance),
      };
      if (
        !event.speaker ||
        !event.title ||
        !event.subjects.length ||
        !event.timeslots.length
      ) {
        this.openModal();
      } else {
        try {
          const res = await fetch(`${this.$server}/events`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
          });
          if (res.ok) {
            const { id } = await res.json();
            this.formActive = false;
            this.resetForm();
            this.$emit("add-event", id);
            this.openModal("Success", "Your new event has been added.");
          }
        } catch (error) {
          this.openModal(
            "Oops...",
            "Something went wrong while trying to add a new event, please try again later."
          );
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_abstracts.scss";
.heading {
  margin-bottom: 1rem;
}
.form {
  display: grid;
  gap: 1rem;
  &__message {
    font-size: 0.75rem;
    margin-top: 0.25rem;
    color: $color-grey;
  }
}
</style>
