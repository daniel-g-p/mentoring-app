import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db;

export const connectDatabase = async () => {
  try {
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    db = client.db("mentoring-app");
  } catch (error) {
    throw error;
  }
};

export const getDatabase = () => db;
