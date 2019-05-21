const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const fs = require("fs");

const Job = mongoose.model("job");
const User = mongoose.model("user");

// Getting the search fields
async function searchs() {
  const rawData = fs.readFileSync("search.json");
  const data = JSON.parse(rawData);
  return data;
}

// Getting the html data
async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

async function scrape(jobTitle = "web developer", location = "taunton") {
  let startJob = 0;
  let jobLists = [];
  let amountOfJobs;
  do {
    const html = await getHTML(
      `https://www.indeed.co.uk/jobs?q=${jobTitle}&l=${location}&start=${startJob}`
    );
    const $ = cheerio.load(html);
    if (!amountOfJobs) {
      amountOfJobs = $("#searchCount")
        .text()
        .trim()
        .split(" ")[Number(3)];
    }
    const divs = $(".jobsearch-SerpJobCard");
    divs.each(async function(index, el) {
      if (jobLists.length === amountOfJobs) {
        return jobLists;
      }
      const object = {};
      object.title = $(this)
        .find(".jobtitle")
        .text()
        .trim();
      object.company = $(this)
        .find(".company")
        .text()
        .trim();
      object.location = $(this)
        .find(".location")
        .text()
        .trim();
      object.salary = $(this)
        .find(".salary")
        .text()
        .trim();
      object.jobId = $(this).attr("id");
      object.link = $(this)
        .find(".turnstileLink")
        .attr("href");
      object.date = $(this)
        .find(".date")
        .text()
        .trim();
      object.summary = $(this)
        .find(".summary")
        .text()
        .trim();
      jobLists.push(object);
    });
    startJob += 10;
  } while (jobLists.length < amountOfJobs);
  return jobLists;
}

async function scrapeData(id) {
  const user = await User.findById(id);
  const data = await scrape();
  const newdate = data.map(async item => {
    const existingJob = await Job.findOne({ jobId: item.jobId });
    if (existingJob) {
      return;
    }
    try {
      let job = new Job({
        title: item.title,
        company: item.company,
        location: item.location,
        salary: item.salary,
        jobId: item.jobId,
        link: item.link,
        date: item.date,
        summary: item.summary
      });

      await job.save();
    } catch (error) {
      console.error(error);
      return new Error(error);
    }
  });
  return data;
}

async function indeedScrape(id) {
  const data = await scrapeData(id);
  const jsonData = JSON.stringify(data);
  fs.writeFileSync("data.json", jsonData);
  return "Scrape done";
}

module.exports = indeedScrape;
