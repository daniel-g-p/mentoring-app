import { getDatabase } from "../utilities/database.js";

export default class Event {
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
  static async delete(query) {
    const db = getDatabase();
    const collection = db.collection("events");
    return await collection.deleteMany(query);
  }
}
