import express from "express";

import { tryCatch } from "../utilities/error-handling.js";

import controller from "../controllers/events.js";

const router = express.Router();

router
  .route("/")
  .get(tryCatch(controller.getEvents))
  .post(tryCatch(controller.newEvent));

router.route("/registration").post(tryCatch(controller.addParticipant));

export default router;
