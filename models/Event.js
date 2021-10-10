import { getDatabase } from "../utilities/database.js";
import { ObjectId } from "mongodb";

export class Event {
  constructor(speaker, title, subjects, timeslots, maxAttendance) {
    this.speaker = speaker;
    this.title = title;
    (this.subjects = subjects), (this.timeslots = timeslots);
    this.maxAttendance = maxAttendance;
  }
  async create() {
    const db = getDatabase();
    const collection = db.collection("events");
    const event = await collection.insertOne(this);
    return event;
  }
}
