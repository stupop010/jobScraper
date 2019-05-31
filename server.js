const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

connectDB();

require("./models/User");
require("./models/Job");

// Cron jobs
require("./cronJob/cronScrap");
require("./cronJob/cronEmail");

app.use(cors());

app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/jobs", require("./routes/api/jobs"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
