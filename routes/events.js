import express from "express";

import events from "../controllers/events.js";

const router = express.Router();

router.get("/new", events.newEvent);

export default router;
