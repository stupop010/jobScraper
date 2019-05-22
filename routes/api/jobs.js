const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator/check");

const updateDate = require("../../scraping/lib/updateData");
const indeedScrape = require("../../scraping/lib/indeedScrape");

const User = mongoose.model("user");
const Job = mongoose.model("job");

// @route  Get /api
// @desc   Get all jobs
// @access Private
Router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    // Remove all the out of datas and with no data
    const data = await updateDate(jobs);
    res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// @route  Put /api
// @desc   Update the searchs in user, request a new search
// @access Private
Router.put(
  "/",
  [
    check("location", "location is required")
      .not()
      .isEmpty(),
    check("jobTitle", "Job title is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { location, jobTitle } = req.body;

    try {
      // If new search, all the previous job will be delete
      // that owns by user
      await Job.deleteMany();
      // Update the search on user
      await User.findOneAndUpdate("5ce47a148f424013b34ffe5d", {
        $set: {
          searchs: {
            location,
            jobTitle
          }
        }
      });
      // Request new search with new search fields
      await indeedScrape("5ce47a148f424013b34ffe5d");
      res.json({ message: "Search is updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  }
);
module.exports = Router;
