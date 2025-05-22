const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/config.env" });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch((err) => {
    console.log("Error", err);
  });
