import { Event } from "../models/Event.js";
import { eventSchema } from "../utilities/schemas.js";

export default {
  newEvent(req, res, next) {
    const { valid, status, data, message } = eventSchema(req.body);
    if (!valid) {
      console.log(message);
      return res.json({ status, message });
    }
    const event = new Event(
      data.speaker,
      data.title,
      data.subjects,
      data.timeslots,
      data.maxAttendance
    );
    console.log(event);
    return res.json({ status, data });
  },
};
