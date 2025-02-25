import { query, validationResult } from "express-validator";

export const validateTokenQuery = [
  query("region")
    .notEmpty()
    .withMessage("region is required")
    .isIn(["us", "eu", "kr", "tw"])
    .withMessage("region must be one of 'us', 'eu', 'kr', 'tw'"),

  query("period")
    .notEmpty()
    .withMessage("period is required")
    .isIn(["1d", "7d", "30d"])
    .withMessage("period must be one of '1d', '7d', '30d'"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];
