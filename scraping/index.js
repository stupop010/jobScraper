const request = require("request");
const cheerio = require("cheerio");
const scrapIndeed = require("./untils/scrapIndeed");
const clearFile = require("./untils/clearFile");
const fs = require("fs");

let jobLists = [];
var jobCount = 0;
let startPage = 0;
let pageCounter = 0;

clearFile();

async function indeedJobs() {
  request(
    `https://www.indeed.co.uk/jobs?q=web+developer&l=taunton&start=${pageCounter}`,
    async function(error, response, html) {
      if (!error && response.statusCode == 200) {
        // loading the html in a var
        var $ = await cheerio.load(html);
        const divs = await $(".jobsearch-SerpJobCard");

        const data = scrapIndeed($, divs);
        fs.appendFile("jobs.json", JSON.stringify(data, null, 2), function(
          err
        ) {
          if (err) throw err;
          console.log("Saved!");
        });
        console.log(data.length);
      }
    }
  );
  pageCounter += 1;
  console.log(jobLists);
  if (pageCounter === 3) {
    return await jobLists;
  } else {
    return indeedJobs();
  }
}
const data = indeedJobs();
console.log(data);
