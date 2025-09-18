import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import express from "express";
const router = express.Router();

import {
  ApproveVendorApplicationUseCase,
  CreateVendorUseCase,
  DeleteVendorUseCase,
  GetVendorByIdUseCase,
  GetVendorOrdersUseCase,
  GetVendorProductsUseCase,
  GetVendorsUseCase,
  RejectVendorApplicationUseCase,
  UpdateVendorUseCase,
  UpdateVendorAvailabilityUseCase,
} from "../services/index.js";

// Create a new vendor
router.post("/vendors", async (req, res, next) => {
  try {
    const { name, email, businessName, category } = req.body;
    const vendor = await CreateVendorUseCase({
      name,
      email,
      businessName,
      category,
    });
    res.status(201).json(vendor);
  } catch (error) {
    next(error);
  }
});

// Get vendor by ID
router.get("/vendors/:vendorId", async (req, res, next) => {
  try {
    const vendor = await GetVendorByIdUseCase(req.params.vendorId);
    res.json(vendor);
  } catch (error) {
    next(error);
  }
});

// Get all vendors
router.get("/vendors", async (req, res, next) => {
  try {
    const vendors = await GetVendorsUseCase();
    res.json(vendors);
  } catch (error) {
    next(error);
  }
});

// Update vendor details
router.patch("/vendors/:vendorId", async (req, res, next) => {
  try {
    const updates = req.body;
    const updatedVendor = await UpdateVendorUseCase(
      req.params.vendorId,
      updates
    );
    res.json(updatedVendor);
  } catch (error) {
    next(error);
  }
});

// Update vendor availability
router.patch("/vendors/:vendorId/availability", async (req, res, next) => {
  try {
    const { available } = req.body;
    await UpdateVendorAvailabilityUseCase(req.params.vendorId, available);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Delete a vendor
router.delete("/vendors/:vendorId", async (req, res, next) => {
  try {
    await DeleteVendorUseCase(req.params.vendorId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Approve a vendor application
router.post("/vendors/:vendorId/approve", async (req, res, next) => {
  try {
    await ApproveVendorApplicationUseCase(req.params.vendorId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Reject a vendor application
router.post("/vendors/:vendorId/reject", async (req, res, next) => {
  try {
    const { reason } = req.body;
    await RejectVendorApplicationUseCase(req.params.vendorId, reason);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Get all orders for a vendor
router.get("/vendors/:vendorId/orders", async (req, res, next) => {
  try {
    const orders = await GetVendorOrdersUseCase(req.params.vendorId);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Get all products for a vendor
router.get("/vendors/:vendorId/products", async (req, res, next) => {
  try {
    const products = await GetVendorProductsUseCase(req.params.vendorId);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

export default router;
