import Event from "../models/Event.js";
import { eventSchema, participantSchema } from "../utilities/schemas.js";

export default {
  async getEvents(req, res, next) {
    const events = await Event.find({});
    events.sort((prev, next) => {
      return prev.created > next.created ? -1 : 1;
    });
    return res.json(events);
  },
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
  async addParticipant(req, res, next) {
    const { valid, status, data, message } = participantSchema(req.body);
    if (!valid) {
      return res.json({ status, message });
    }
    const eventData = await Event.find({ _id: data.eventId });
    if (!eventData.length) {
      return res.json({
        status: 500,
        message: "Failed to find the event you were looking for.",
      });
    }
    const event = eventData[0];
    const index = event.timeslots.findIndex((timeslot) => {
      return (
        timeslot.hours === data.timeslot.hours &&
        timeslot.minutes === data.timeslot.minutes &&
        timeslot.duration === data.timeslot.duration
      );
    });
    if (event.timeslots[index].attendees >= event.maxAttendance) {
      return res.json({
        status: 200,
        message:
          "There are no more avalaible tickets for this event at that time",
      });
    }
    event.timeslots[index].attendees++;
    const update = await Event.edit(data.eventId, {
      timeslots: event.timeslots,
    });
    if (!update.modifiedCount) {
      return res.json({
        status: 500,
        message: "Failed to find the event you were looking for.",
      });
    }
    return res.json({
      status: 200,
      message: "Participant was added to the event.",
    });
  },
};
