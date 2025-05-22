require("dotenv").config({ path: "../config/config.env" });
const express = require("express");
const router = express.Router();
const Vendors = require("../schemas/vendorSchema");

// const { GridFsStorage } = require("multer-gridfs-storage");

// const storage = new GridFsStorage({
//   url: process.env.MONGODB_URI,
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//       bucketName: "Vendor_Images",
//     };
//   },
// });

// const upload = multer({ storage });

router.get("/vendors", async (req, res) => {
  const vendors = await Vendors.find({});

  return res.json({ message: "Configured successfully" });
});

module.exports = router;
