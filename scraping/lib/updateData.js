const fs = require("fs");

async function updateDate() {
  const rawData = fs.readFileSync("data.json");
  const data = JSON.parse(rawData);

  // Remove all empty date
  const removeTheEmptyDate = data.filter(item => item.date !== "");
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

module.exports = updateDate;
