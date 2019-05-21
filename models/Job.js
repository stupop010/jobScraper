const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: String
  },
  jobId: {
    type: String
  },
  link: {
    type: String
  },
  location: {
    type: String
  },
  salary: {
    type: String
  },
  summary: {
    type: String
  },
  _dateOfScrap: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("job", JobSchema);
