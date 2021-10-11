import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { connectDatabase } from "./utilities/database.js";
import { errorHandler } from "./utilities/error-handling.js";

import rootRouter from "./routes/root.js";
import eventsRouter from "./routes/events.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", rootRouter);
app.use("/events", eventsRouter);

app.use("/", errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(process.env.PORT || 3000);
    if (process.env.NODE_ENV === "development") {
      console.log(`Server running on ${process.env.SERVER}...`);
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

startServer();
