var cheerio = require("cheerio");

module.exports = function scrapIndeed($, divs) {
  let jobLists = [];
  divs.each(async function(index, el) {
    const object = {};
    object.title = $(this)
      .children(".jobtitle")
      .text()
      .trim();
    object.company = $(this)
      .find(".company")
      .text()
      .trim();
    object.location = $(this)
      .find(".location")
      .text()
      .trim();
    object.salary = $(this)
      .find(".salary")
      .text()
      .trim();
    object.jobId = $(this).attr("id");
    object.link = $(this)
      .find(".turnstileLink")
      .attr("href");
    object.date = $(this)
      .find(".date")
      .text()
      .trim();
    object.summary = $(this)
      .find(".summary")
      .text()
      .trim();
    jobLists.push(object);
  });
  return jobLists;
};
