const moongoose = require("mongoose");
const Jobs = moongoose.model("job");

async function updateDate(jobs) {
  // Remove all empty date
  const removeTheEmptyDate = jobs.filter(item => item.date !== "");
  // Remove all dates under 20
  const removedDaysOver20 = removeTheEmptyDate.filter(
    item => item.date.split(" ")[Number(0)] <= 20
  );
  // Remove all months
  const removedMonths = removedDaysOver20.filter(
    item => item.date.split(" ")[1] !== "months"
  );
  return removedMonths;
}

async function emailData() {
  const jobs = await Jobs.find();
  console.log(jobs);
  const filterJobs = jobs
    .filter(item => item.date !== "")
    .filter(item => item.date.split(" ")[Number(0)] <= 6)
    .filter(item => item.date.split(" ")[1] !== "months")
    .filter(item => item.date.split(" ")[1] !== "days")
    .filter(item => item.date.split(" ")[1] !== "day");
  console.log(filterJobs);
  return filterJobs;
}
module.exports = { updateDate, emailData };
