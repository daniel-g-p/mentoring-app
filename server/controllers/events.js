import { Event } from "../models/Event.js";
import { eventSchema } from "../utilities/schemas.js";

export default {
  newEvent(req, res, next) {
    const { valid, status, data, message } = eventSchema(req.body);
    if (!valid) {
      return res.json({ status, message });
    }
    return res.json({ status, data });
  },
};
