import express from "express";
const router = express.Router();

import {
  CancelOrderUseCase,
  CompleteOrderUseCase,
  GetOrderByIdUseCase,
  GetOrderSummaryUseCase,
  GetOrderTimelineUseCase,
  GetOrdersByUserUseCase,
  GetOrdersByVendorUseCase,
  ListOrdersByStatusUseCase,
  NotifyOrderReadyUseCase,
  PlaceOrderUseCase,
  RateOrderUseCase,
  RefundOrderUseCase,
  UpdateOrderStatusUseCase,
} from "../services/index.js";

// Place a new order
router.post("/orders", async (req, res, next) => {
  try {
    const { userId, items, deliveryAddress, paymentMethod } = req.body;
    const order = await PlaceOrderUseCase({
      userId,
      items,
      deliveryAddress,
      paymentMethod,
    });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// Get order by ID
router.get("/orders/:orderId", async (req, res, next) => {
  try {
    const order = await GetOrderByIdUseCase(req.params.orderId);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// Get order summary
router.get("/orders/:orderId/summary", async (req, res, next) => {
  try {
    const summary = await GetOrderSummaryUseCase(req.params.orderId);
    res.json(summary);
  } catch (error) {
    next(error);
  }
});

// Get order timeline (status history)
router.get("/orders/:orderId/timeline", async (req, res, next) => {
  try {
    const timeline = await GetOrderTimelineUseCase(req.params.orderId);
    res.json(timeline);
  } catch (error) {
    next(error);
  }
});

// Get all orders placed by a user
router.get("/users/:userId/orders", async (req, res, next) => {
  try {
    const orders = await GetOrdersByUserUseCase(req.params.userId);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Get all orders received by a vendor
router.get("/vendors/:vendorId/orders", async (req, res, next) => {
  try {
    const orders = await GetOrdersByVendorUseCase(req.params.vendorId);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// List orders by status
router.get("/orders/status/:status", async (req, res, next) => {
  try {
    const orders = await ListOrdersByStatusUseCase(req.params.status);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Update order status
router.patch("/orders/:orderId/status", async (req, res, next) => {
  try {
    const { status } = req.body;
    await UpdateOrderStatusUseCase(req.params.orderId, status);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Mark order as complete
router.post("/orders/:orderId/complete", async (req, res, next) => {
  try {
    await CompleteOrderUseCase(req.params.orderId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Cancel an order
router.post("/orders/:orderId/cancel", async (req, res, next) => {
  try {
    const { reason } = req.body;
    await CancelOrderUseCase(req.params.orderId, reason);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Notify that order is ready
router.post("/orders/:orderId/notify-ready", async (req, res, next) => {
  try {
    await NotifyOrderReadyUseCase(req.params.orderId);
    res.sendStatus(204);
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

// Refund an order
router.post("/orders/:orderId/refund", async (req, res, next) => {
  try {
    const { reason } = req.body;
    await RefundOrderUseCase(req.params.orderId, reason);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
