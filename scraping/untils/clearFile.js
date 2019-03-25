const fs = require("fs");

module.exports = function clearFile() {
  return fs.writeFile("jobs.json", "", () => {
    console.log("File deleted");
  });
};
