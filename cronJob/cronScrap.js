const CronJob = require("cron").CronJob;
const indeedScrape = require("../scraping/lib/indeedScrape");
const removingDuplicates = require("../scraping/lib/removingDuplicates");
const { emailData } = require("../scraping/lib/updateData");
const { sendNewJobs } = require("../emails/account");

new CronJob(
  "*/60 * * * *",
  async () => {
    console.log("scraping");

    // Scape indeed
    await indeedScrape();
    // remove any job duplicates
    removingDuplicates();
    // reduce the jobs that been posted < 6hours
    const data = await emailData();
    // send any jobs possts to myself
    sendNewJobs(data);
  },
  null,
  true,
  "America/Los_Angeles"
);
