import dotenv from "dotenv";
import express from "express";

import eventsRouter from "./routes/events.js";

dotenv.config();

const app = express();

app.get("/", (req, res, next) => {
  return res.send("Hello World");
});

app.use("/events", eventsRouter);

const startServer = () => {
  const port = process.env.PORT || 3000;
  app.listen(port);
  if (process.env.NODE_ENV === "development") {
    console.log(`Server running on http://localhost:${port}/`);
  }
};

startServer();
