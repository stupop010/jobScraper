const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./config/db");

require("./models/User");
require("./models/Job");

// Cron jobs
// require("./cronJob/cronScrap");
require("./cronJob/cronEmail");

app.use(cors());

app.use(express.json({ extended: false }));

app.use("/auth", require("./routes/api/auth"));
app.use("/api", require("./routes/api/jobs"));

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
