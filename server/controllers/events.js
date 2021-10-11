import { Event } from "../models/Event.js";
import { eventSchema } from "../utilities/schemas.js";

export default {
  async newEvent(req, res, next) {
    const { valid, status, data, message } = eventSchema(req.body);
    if (!valid) {
      return res.json({ status, message });
    }
    const event = await new Event(
      data.speaker,
      data.title,
      data.subjects,
      data.timeslots,
      data.maxAttendance
    ).create();
    if (!event.acknowledged) {
      return res.json({
        status: 500,
        message:
          "Something went wrong while creating a new event, please try again later.",
      });
    }
    return res.json({ status, id: event.insertedId.toString() });
  },
};
