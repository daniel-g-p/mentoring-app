import express from "express";

import { tryCatch } from "../utilities/error-handling.js";

import controller from "../controllers/root.js";

const router = express.Router();

router.get("/", tryCatch(controller.getHomepage));

export default router;
