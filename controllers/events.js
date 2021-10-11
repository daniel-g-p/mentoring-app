import { Event } from "../models/Event.js";

export default {
  newEvent(req, res, next) {
    const { data } = req.body;
    console.log(data);
    // return res.json({ status: 200 });
  },
};
