const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const {
  register,
  login,
  me,
  logout,
} = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const Joi = require("joi");

/* Validation schemas */
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(40).required().messages({
    "string.min": "Name must be at least 3 chars",
    "any.required": "Name required",
  }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "string.email": "Invalid email" }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])"))
    .required()
    .messages({
      "string.min": "Password min 6 chars",
      "string.pattern.base": "Password must contain letters and numbers",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/* routes */
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", auth, me);
router.post("/logout", auth, logout);

module.exports = router;
