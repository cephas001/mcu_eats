import express from "express";
const router = express.Router();

import {
  CreateConsumerUseCase,
  CreateFavoriteUseCase,
  DeleteConsumerUseCase,
  GetConsumerByIdUseCase,
  GetConsumerOrdersUseCase,
  GetFavoritesUseCase,
  RateOrderUseCase,
  RateVendorUseCase,
  RemoveFavoriteUseCase,
  UpdateConsumerUseCase,
} from "../services/index.js";

// Create a new consumer
router.post("/consumers", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const consumer = await CreateConsumerUseCase({ name, email, password });
    res.status(201).json(consumer);
  } catch (error) {
    next(error);
  }
});

// Get consumer by ID
router.get("/consumers/:id", async (req, res, next) => {
  try {
    const consumer = await GetConsumerByIdUseCase(req.params.id);
    res.json(consumer);
  } catch (error) {
    next(error);
  }
});

// Delete a consumer
router.delete("/consumers/:id", async (req, res, next) => {
  try {
    await DeleteConsumerUseCase(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Update consumer details
router.patch("/consumers/:id", async (req, res, next) => {
  try {
    const updates = req.body;
    const updatedConsumer = await UpdateConsumerUseCase(req.params.id, updates);
    res.json(updatedConsumer);
  } catch (error) {
    next(error);
  }
});

// Get all orders for a consumer
router.get("/consumers/:id/orders", async (req, res, next) => {
  try {
    const orders = await GetConsumerOrdersUseCase(req.params.id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Add a favorite item/vendor for a consumer
router.post("/consumers/:id/favorites", async (req, res, next) => {
  try {
    const { itemId, vendorId } = req.body;
    await CreateFavoriteUseCase(req.params.id, { itemId, vendorId });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// Remove a favorite item/vendor
router.delete("/consumers/:id/favorites", async (req, res, next) => {
  try {
    const { itemId, vendorId } = req.body;
    await RemoveFavoriteUseCase(req.params.id, { itemId, vendorId });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Get all favorites for a consumer
router.get("/consumers/:id/favorites", async (req, res, next) => {
  try {
    const favorites = await GetFavoritesUseCase(req.params.id);
    res.json(favorites);
  } catch (error) {
    next(error);
  }
});

// Rate an order
router.post("/orders/:orderId/rate", async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    await RateOrderUseCase(req.params.orderId, { rating, comment });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// Rate a vendor
router.post("/vendors/:vendorId/rate", async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    await RateVendorUseCase(req.params.vendorId, { rating, comment });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

export default router;
