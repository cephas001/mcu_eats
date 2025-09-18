import express from "express";
const router = express.Router();

import {
  GetPaymentHistoryUseCase,
  GetRefundHistoryUseCase,
  InitiatePaymentUseCase,
  IssueRefundUseCase,
  RemovePaymentMethodUseCase,
  SavePaymentMethodUseCase,
  ValidatePaymentMethodUseCase,
  VerifyPaymentUseCase,
} from "../services/index.js";

// Initiate a payment
router.post("/payments/initiate", async (req, res, next) => {
  try {
    const { userId, amount, method, currency } = req.body;
    const payment = await InitiatePaymentUseCase({
      userId,
      amount,
      method,
      currency,
    });
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
});

// Verify a payment
router.post("/payments/:paymentId/verify", async (req, res, next) => {
  try {
    const { verificationCode } = req.body;
    const result = await VerifyPaymentUseCase(
      req.params.paymentId,
      verificationCode
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Save a payment method for a user
router.post("/users/:userId/payment-methods", async (req, res, next) => {
  try {
    const { methodType, details } = req.body;
    await SavePaymentMethodUseCase(req.params.userId, { methodType, details });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// Remove a saved payment method
router.delete(
  "/users/:userId/payment-methods/:methodId",
  async (req, res, next) => {
    try {
      await RemovePaymentMethodUseCase(req.params.userId, req.params.methodId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

// Validate a payment method
router.post("/payment-methods/:methodId/validate", async (req, res, next) => {
  try {
    const { validationData } = req.body;
    const result = await ValidatePaymentMethodUseCase(
      req.params.methodId,
      validationData
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Issue a refund for a payment
router.post("/payments/:paymentId/refund", async (req, res, next) => {
  try {
    const { reason, amount } = req.body;
    await IssueRefundUseCase(req.params.paymentId, { reason, amount });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Get payment history for a user
router.get("/users/:userId/payments", async (req, res, next) => {
  try {
    const history = await GetPaymentHistoryUseCase(req.params.userId);
    res.json(history);
  } catch (error) {
    next(error);
  }
});

// Get refund history for a user
router.get("/users/:userId/refunds", async (req, res, next) => {
  try {
    const history = await GetRefundHistoryUseCase(req.params.userId);
    res.json(history);
  } catch (error) {
    next(error);
  }
});

export default router;
