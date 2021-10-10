import express from "express";

import controller from "../controllers/events.js";

const router = express.Router();

router.get("/new", controller.newEvent);

export default router;
