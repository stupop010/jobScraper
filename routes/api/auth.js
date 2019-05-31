const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

const User = mongoose.model("user");

// @route  Get /api/user
// @desc   Get user
// @access Public

Router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route  POST /api/user
// @desc   Create new user
// @access Public
Router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    check("password2", "Password is required").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { email, password, password2 } = req.body;
      if (!password === password2)
        return res.status(400).json({ message: "Password does not matched " });
      let user = await User.findOne({ email });

      if (user) return res.status(400).json({ message: "User already exists" });

      user = new User({
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = Router;
