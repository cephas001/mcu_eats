import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import express from "express";
const router = express.Router();
import Vendors from "../models/vendorModel.js";

import { getVendorProfilesUseCase } from "../services/index.js";

router.get("/vendors", async (req, res) => {
  try {
    const vendors = await getVendorProfilesUseCase();
    console.log(vendors);
    res.json(vendors);
  } catch (error) {
    console.log(error);
  }
});

// NOT REFACTORED
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
