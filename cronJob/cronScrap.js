const CronJob = require("cron").CronJob;
const indeedScrape = require("../scraping/lib/indeedScrape");

new CronJob(
  "*/30 * * * *",
  async () => {
    console.log("scraping");
    await indeedScrape();
  },
  null,
  true,
  "America/Los_Angeles"
);
