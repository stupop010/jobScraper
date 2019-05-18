const CronJob = require("cron").CronJob;
const indeedScrape = require("../scraping/lib/indeedScrape");
const fs = require("fs");

new CronJob(
  "0 0 10/12 *  *",
  async () => {
    const res = await indeedScrape();
  },
  null,
  true,
  "America/Los_Angeles"
);
