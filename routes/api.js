const express = require("express");
const router = express.Router();
const fs = require("fs");

const updateDate = require("../scraping/lib/updateData");
const indeedScrape = require("../scraping/lib/indeedScrape");

router.post("/", async (req, res) => {
  const { location, jobTitle } = req.body;
  const data = {
    location,
    jobTitle
  };
  try {
    // Write the search to a file
    // to change our url for the scrape
    fs.writeFileSync("search.json", JSON.stringify(data));

    // Scrape with the new search fields
    const scrape = await indeedScrape();

    return res.json({ messgae: `Search Added, ${scrape}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

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
