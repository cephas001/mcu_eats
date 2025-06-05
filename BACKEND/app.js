require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
require("./dbConnection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/uploads", express.static("./uploads"));
app.use("", require("./routes/vendorApi"));
app.use("", require("./routes/userApi"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
