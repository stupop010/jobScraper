const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const updateDate = require("../scraping/lib/updateData");
const indeedScrape = require("../scraping/lib/indeedScrape");

const User = mongoose.model("user");

router.get("/", async (req, res) => {
  try {
    // Read the data and send it
    const data = await updateDate();
    res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
