const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

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
    divs.each(function(index, el) {
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

async function scrapeData() {
  const search = await searchs();
  const data = await scrape(search.jobTitle, search.location);
  return data;
}

async function indeedScrape() {
  const data = await scrapeData();
  const jsonData = JSON.stringify(data);
  fs.writeFileSync("data.json", jsonData);
  return "Scrape done";
}

module.exports = indeedScrape;
