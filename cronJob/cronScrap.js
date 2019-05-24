const CronJob = require("cron").CronJob;
const indeedScrape = require("../scraping/lib/indeedScrape");

new CronJob(
  "*/1 * * * *",
  async () => {
    console.log("scraping");
    const jobs = await indeedScrape();
    console.log(jobs);
  },
  null,
  true,
  "America/Los_Angeles"
);
