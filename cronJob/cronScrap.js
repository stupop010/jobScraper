const CronJob = require("cron").CronJob;
const indeedScrape = require("../scraping/lib/indeedScrape");

new CronJob(
  "*/1 * * * *",
  async () => {
    await indeedScrape();
  },
  null,
  true,
  "America/Los_Angeles"
);
