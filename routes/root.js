import express from "express";

import controller from "../controllers/root.js";

const router = express.Router();

router.get("/", controller.getHomepage);

export default router;
