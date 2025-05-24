require("dotenv").config({ path: "../config/config.env" });
const express = require("express");
const router = express.Router();
const Vendors = require("../schemas/vendorSchema");
const compareTime = require("../utils/compareTime");

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
    const rawRestaurants = await Vendors.find({ type: "restaurant" }).lean();
    const rawRetailers = await Vendors.find({ type: "retailer" }).lean();
    const rawShops = await Vendors.find({ type: "shop" }).lean();

    // Uses compareTime function to check and return whether a vendor is open or not
    // Can be scaled to include other Key-Value pairs, through utility functions e.g. favourite? based on the logged in user

    const restaurants = rawRestaurants.map((restaurant) => {
      return {
        ...restaurant,
        open: compareTime(
          restaurant.closing_time.hour,
          restaurant.closing_time.minute,
          restaurant.taking_orders
        ),
      };
    });

    const retailers = rawRetailers.map((retailer) => {
      return {
        ...retailer,
        open: compareTime(
          retailer.closing_time.hour,
          retailer.closing_time.minute,
          retailer.taking_orders
        ),
      };
    });

    const shops = rawShops.map((shop) => {
      return {
        ...shop,
        open: compareTime(
          shop.closing_time.hour,
          shop.closing_time.minute,
          shop.taking_orders
        ),
      };
    });

    return res.json({
      restaurants,
      retailers,
      shops,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/vendors/:id", async (req, res) => {
  try {
    const vendor = await Vendors.findOne({ _id: req.params.id });
    console.log(req.params.id);
    if (vendor) {
      res.json({ vendor });
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
