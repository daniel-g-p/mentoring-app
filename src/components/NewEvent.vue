<template>
  <base-block class="container">
    <h2 class="heading">New Event</h2>
    <form
      action="/"
      class="form"
      v-on:keydown.enter="prevent"
      v-on:submit.prevent="submit"
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
        v-bind:options="parameters.timeslots"
        v-on:toggle-option="toggleTimeslot"
      ></new-event-timeslots>
      <base-type-input
        v-bind="parameters.maxAttendance"
        v-model="maxAttendance"
      ></base-type-input>
      <base-button>Submit</base-button>
    </form>
  </base-block>
  <base-modal v-if="errorOpen">
    <template v-slot:title>Oops...</template>
    <template v-slot:message>
      Please fill in all required fields to create a new event.
    </template>
    <template v-slot:buttons>
      <base-button v-on:click="closeErrorModal">Ok</base-button>
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
        timeslots: [
          {
            id: "slot1",
            label: "08:00 - 08:30",
            time: {
              hours: 8,
              minutes: 0,
              duration: 30,
            },
          },
          {
            id: "slot2",
            label: "08:45 - 09:15",
            time: {
              hours: 8,
              minutes: 45,
              duration: 30,
            },
          },
          {
            id: "slot3",
            label: "09:30 - 10:00",
            time: {
              hours: 9,
              minutes: 30,
              duration: 30,
            },
          },
          {
            id: "slot4",
            label: "10:15 - 10:45",
            time: {
              hours: 10,
              minutes: 15,
              duration: 30,
            },
          },
          {
            id: "slot5",
            label: "11:00 - 11:30",
            time: {
              hours: 11,
              minutes: 0,
              duration: 30,
            },
          },
          {
            id: "slot6",
            label: "11:45 - 12:15",
            time: {
              hours: 11,
              minutes: 45,
              duration: 30,
            },
          },
        ],
        maxAttendance: {
          id: "maxAttendance",
          label: "Maximum Attendance",
          type: "number",
          min: 1,
          max: 100,
          errorMessage: "Maximum attendance must be between 1 and 100",
        },
      },
      speaker: "",
      title: "",
      subjectInput: "",
      subjects: [],
      timeslots: [],
      maxAttendance: null,
      errorOpen: false,
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
    toggleTimeslot(id) {
      const index = this.timeslots.findIndex((item) => item === id);
      if (index === -1) {
        this.timeslots.push(id);
      } else {
        this.timeslots.splice(index, 1);
      }
    },
    prevent(event) {
      event.preventDefault();
    },
    submit() {
      const data = {
        speaker: this.speaker.trim(),
        title: this.title.trim(),
        subjects: this.subjects,
        timeslots: this.timeslots.map((item) => {
          const { time } = this.parameters.timeslots.find(
            (slot) => slot.id === item
          );
          return time;
        }),
        maxAttendance: this.maxAttendance ? parseInt(this.maxAttendance) : null,
      };
      if (
        !data.speaker ||
        !data.title ||
        !data.subjects.length ||
        !data.timeslots.length ||
        !data.maxAttendance
      ) {
        this.errorOpen = true;
      } else {
        alert("OK!");
      }
    },
    closeErrorModal() {
      this.errorOpen = false;
      console.log(this.errorOpen);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_abstracts.scss";
.container {
  border: 0.125rem solid $color-grey;
}
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
