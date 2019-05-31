const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const keys = require("../../config/keys");

const User = mongoose.model("user");

// @route  POST /api/user
// @desc   Post all jobs
// @access Public
Router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [{ message: "Either email or password is incorrected" }]
        });
      }

      const passMatched = await bcrypt.compare(password, user.password);

      if (!passMatched) {
        return res.status(400).json({
          errors: [{ message: "Either email or password is incorrected" }]
        });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, keys.jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = Router;
