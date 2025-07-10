import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import express from "express";
const router = express.Router();
import Vendors from "../models/vendorModel.js";

router.get("/vendors", async (req, res) => {
  try {
    const restaurants = await Vendors.find({ type: "restaurant" }).lean();
    const retailers = await Vendors.find({ type: "retailer" }).lean();
    const shops = await Vendors.find({ type: "shop" }).lean();

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
    if (vendor) {
      res.json({ vendor });
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
