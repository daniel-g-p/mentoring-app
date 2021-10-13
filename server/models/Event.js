import { ObjectId } from "mongodb";
import { getDatabase } from "../utilities/database.js";

export default class Event {
  constructor(speaker, title, subjects, timeslots, maxAttendance) {
    this.speaker = speaker;
    this.title = title;
    (this.subjects = subjects), (this.timeslots = timeslots);
    this.maxAttendance = maxAttendance;
    this.created = new Date();
  }
  async create() {
    const db = getDatabase();
    const collection = db.collection("events");
    const event = await collection.insertOne(this);
    return event;
  }
  static async find(query, fields = []) {
    const db = getDatabase();
    const collection = db.collection("events");
    const searchQuery = query._id ? { _id: new ObjectId(query._id) } : query;
    const options = { projection: {} };
    fields.forEach((field) => {
      options.projection[field] = 1;
    });
    return await collection.find(searchQuery, options).toArray();
  }
  static async delete(query) {
    const db = getDatabase();
    const collection = db.collection("events");
    return await collection.deleteMany(query);
  }
}
