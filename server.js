const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5001;

require("./cronJob/cronScrap");

app.use(cors());

app.use(express.json({ extended: false }));

app.use("/auth", require("./routes/api/auth"));
app.use("/api", require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
