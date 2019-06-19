const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator/check");

const { updateDate } = require("../../scraping/lib/updateData");
const indeedScrape = require("../../scraping/lib/indeedScrape");
const auth = require("../../middleware/auth");
const User = mongoose.model("user");
const Job = mongoose.model("job");

// @route  Get /api/jobs
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

// @route  Put /api/jobs
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
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { location, jobTitle } = req.body;

    try {
      // If new search, all the previous job will be delete
      await Job.deleteMany();
      // Update the search on user

      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: {
            searchs: {
              location,
              jobTitle
            }
          }
        }
      );

      // Request new search with new search fields
      await indeedScrape(req.user.id);
      res.json(user.search);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  }
);

// @route  Get /api/jobs/searchs
// @desc   Get search fields for user
// @access Private
Router.get("/searchs", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.searchs);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Router;
