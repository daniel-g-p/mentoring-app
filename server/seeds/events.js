import Chance from "chance";
const chance = new Chance();

import { connectDatabase } from "../utilities/database.js";
import Event from "../models/Event.js";

const seedEvents = async (n) => {
  try {
    await connectDatabase();
    await Event.delete({});
    console.log("Events deleted");
    for (let i = 0; i < n; i++) {
      const speaker = chance.first();
      const title = chance.sentence({ words: 3 });
      const subjects = ["Subject 1", "Subject 2", "Subject 3"];
      const timeslots = [
        {
          hours: 8,
          minutes: 0,
          duration: 30,
        },
        {
          hours: 9,
          minutes: 0,
          duration: 30,
        },
        {
          hours: 10,
          minutes: 0,
          duration: 30,
        },
      ];
      const maxAttendance =
        Math.random() > 0.5 ? chance.integer({ min: 25, max: 100 }) : undefined;
      const event = new Event(
        speaker,
        title,
        subjects,
        timeslots,
        maxAttendance
      );
      const { insertedId } = await event.create();
      console.log(`Created event "${insertedId.toString()}"`);
    }
    console.log("Events seeded")
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

seedEvents(10);
