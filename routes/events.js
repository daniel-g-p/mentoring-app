import express from "express";

import { tryCatch } from "../utilities/error-handling.js";

import controller from "../controllers/events.js";

const router = express.Router();

router.post("/", tryCatch(controller.newEvent));

export default router;
