import express from "express";
import tokenController from "../controllers/tokenController.js";
import { validateTokenQuery } from "../validators/tokenValidator.js";

const router = express.Router();

// GET /api/tokens
router.get("/", validateTokenQuery, tokenController.getTokens);

export default router;
