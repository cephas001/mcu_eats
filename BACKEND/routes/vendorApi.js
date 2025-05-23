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
  try {
    const restaurants = await Vendors.find({ type: "restaurant" });
    const retailers = await Vendors.find({ type: "retailer" });
    const shops = await Vendors.find({ type: "shop" });

    return res.json({ restaurants, retailers, shops });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
