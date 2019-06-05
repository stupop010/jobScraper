const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const removingDuplicates = require("../../scraping/lib/removingDuplicates");
const Job = mongoose.model("job");
const User = mongoose.model("user");

// Getting the search fields
async function getSearchsFields(id) {
  const user = await User.findById(id);
  return user.searchs;
}

// Getting the html data
async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

async function scrape(jobTitle, location) {
  console.log("in scrape");
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

async function scrapeData({ location, jobTitle }) {
  const data = await scrape(jobTitle, location);
  data.map(async item => {
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
  // Get search querys from database
  const search = await getSearchsFields(id);
  await scrapeData(search);

  // remove any job duplicates
  await removingDuplicates();
  return "Scrape done";
}

module.exports = indeedScrape;
