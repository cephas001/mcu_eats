require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const cors = require("cors");

const app = express();
require("./dbConnection");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
  })
);
app.use("/uploads", express.static("./uploads"));

app.use("", require("./routes/vendorApi"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
