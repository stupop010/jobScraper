const CronJob = require("cron").CronJob;
const { emailData } = require("../scraping/lib/updateData");
const { sendNewJobs } = require("../emails/account");

new CronJob(
  "* 30 * * *",
  async () => {
    console.log("email");
    const data = await emailData();
    sendNewJobs(data);
  },
  null,
  true,
  "America/Los_Angeles"
);
