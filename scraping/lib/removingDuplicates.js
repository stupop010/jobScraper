const moongoose = require("mongoose");
const Jobs = moongoose.model("job");

const removingDuplicates = () => {
  return new Promise((resolve, reject) => {
    Jobs.aggregate(
      [
        {
          $group: {
            _id: {
              jobId: "$jobId"
            },
            dups: { $addToSet: "$_id" },
            count: { $sum: 1 }
          }
        },
        {
          $match: {
            count: { $gt: 1 }
          }
        }
      ],
      (err, result) => {
        result.forEach(element => {
          Jobs.deleteMany({ _id: { $in: element.dups } }, (err, res) => {
            console.log(err);
            if (err);
          });
        });

        resolve("done");
      }
    );
  });
};

module.exports = removingDuplicates;
