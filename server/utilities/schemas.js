const capitalize = (string) => {
  const trimmed = string.trim();
  return `${trimmed.slice(0, 1).toUpperCase()}${trimmed.slice(1)}`;
};

const condition = (
  condition,
  message = "Please check your input",
  status = 400
) => {
  return condition ? { valid: true } : { valid: false, message, status };
};

const validate = (data, ...conditions) => {
  for (let condition of conditions) {
    if (!condition.valid) {
      return {
        valid: false,
        message: condition.message,
        status: condition.status,
      };
    }
  }
  return { valid: true, data, status: 200 };
};

export const eventSchema = (event) => {
  try {
    console.log(event.maxAttendance, typeof event.maxAttendance);
    const data = {
      speaker: capitalize(event.speaker),
      title: capitalize(event.title),
      subjects: event.subjects.map((subject) => capitalize(subject)),
      timeslots: event.timeslots.sort((prev, next) => {
        const prevHours = `${prev.hours < 10 ? "0" : ""}${prev.hours}`;
        const prevMinutes = `${prev.minutes < 10 ? "0" : ""}${prev.minutes}`;
        const nextHours = `${next.hours < 10 ? "0" : ""}${next.hours}`;
        const nextMinutes = `${next.minutes < 10 ? "0" : ""}${next.minutes}`;
        return parseInt(`${prevHours}${prevMinutes}`) >
          parseInt(`${nextHours}${nextMinutes}`)
          ? 1
          : -1;
      }),
      maxAttendance: parseInt(event.maxAttendance) || undefined,
    };
    return validate(
      data,
      condition(data.speaker, "Please enter a speaker name."),
      condition(data.title, "Please enter an event title."),
      condition(data.subjects.length, "Please enter at least one subject."),
      condition(data.timeslots.length, "Please select at least one timeslot"),
      condition(
        data.timeslots.every((timeslot) => {
          return (
            typeof timeslot.hours === "number" &&
            typeof timeslot.minutes === "number" &&
            typeof timeslot.duration === "number" &&
            timeslot.duration > 0
          );
        }),
        "Please select a valid timeslot"
      ),
      condition(
        data.maxAttendance ? data.maxAttendance <= 100 : true,
        "Maximum attendance must be lower than 100"
      )
    );
  } catch (error) {
    return { valid: false, message: "Something went wrong", status: 500 };
  }
};
