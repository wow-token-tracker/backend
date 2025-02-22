import { Router } from "express";
import { query, validationResult } from "express-validator";
import { getTokens } from "../controllers/tokenController.mjs";

const router = Router();

router.get(
  "/",
  [
    query("region")
      .notEmpty()
      .withMessage("Region must not be empty.")
      .isIn(["us", "eu", "kr", "tw"])
      .withMessage("Invalid region. Must be one of us, eu, kr, tw."),
    query("period")
      .notEmpty()
      .withMessage("Period must not be empty.")
      .isIn(["24h", "7d", "30d"])
      .withMessage("Invalid period. Must be one of 24h, 7d, 30d."),
  ],
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    next();
  },
  getTokens
);

export default router;
