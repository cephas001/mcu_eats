import express from "express";
const router = express.Router();

import verifyToken from "../middlewares/verifyToken.js";

import {
  AcceptDeliveryUseCase,
  AssignDeliveryUseCase,
  CreateDeliveryPersonUseCase,
  DeclineDeliveryUseCase,
  DeleteDeliveryPersonUseCase,
  GetDeliveriesByAreaUseCase,
  GetDeliveryHistoryUseCase,
  GetDeliveryPersonByIdUseCase,
  TrackDeliveryUseCase,
  UpdateDeliveryPersonUseCase,
  UpdateDeliveryStatusUseCase,
} from "../services/index.js";

// Create a new delivery person
router.post("/delivery-persons", verifyToken, async (req, res, next) => {
  try {
    const { deliveryPersonProfileData } = req.body;
    const { savedProfile, updatedUser } = await CreateDeliveryPersonUseCase(
      deliveryPersonProfileData,
      req.user.id
    );
    res.status(201).json({ savedProfile, updatedUser });
  } catch (error) {
    next(error);
  }
});

// Get delivery person by ID
router.get("/delivery-persons/:id", async (req, res, next) => {
  try {
    const deliveryPerson = await GetDeliveryPersonByIdUseCase(req.params.id);
    res.json(deliveryPerson);
  } catch (error) {
    next(error);
  }
});

// Update delivery person details
router.patch("/delivery-persons/:id", async (req, res, next) => {
  try {
    const updates = req.body;
    const updatedPerson = await UpdateDeliveryPersonUseCase(
      req.params.id,
      updates
    );
    res.json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

// Delete a delivery person
router.delete("/delivery-persons/:id", async (req, res, next) => {
  try {
    await DeleteDeliveryPersonUseCase(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Assign a delivery to a delivery person
router.post("/deliveries/:deliveryId/assign", async (req, res, next) => {
  try {
    const { deliveryPersonId } = req.body;
    await AssignDeliveryUseCase(req.params.deliveryId, deliveryPersonId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Accept a delivery assignment
router.post("/deliveries/:deliveryId/accept", async (req, res, next) => {
  try {
    const { deliveryPersonId } = req.body;
    await AcceptDeliveryUseCase(req.params.deliveryId, deliveryPersonId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Decline a delivery assignment
router.post("/deliveries/:deliveryId/decline", async (req, res, next) => {
  try {
    const { deliveryPersonId, reason } = req.body;
    await DeclineDeliveryUseCase(req.params.deliveryId, {
      deliveryPersonId,
      reason,
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Update delivery status
router.patch("/deliveries/:deliveryId/status", async (req, res, next) => {
  try {
    const { status } = req.body;
    await UpdateDeliveryStatusUseCase(req.params.deliveryId, status);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Track a delivery
router.get("/deliveries/:deliveryId/track", async (req, res, next) => {
  try {
    const trackingInfo = await TrackDeliveryUseCase(req.params.deliveryId);
    res.json(trackingInfo);
  } catch (error) {
    next(error);
  }
});

// Get delivery history for a delivery person
router.get("/delivery-persons/:id/history", async (req, res, next) => {
  try {
    const history = await GetDeliveryHistoryUseCase(req.params.id);
    res.json(history);
  } catch (error) {
    next(error);
  }
});

// Get deliveries by area
router.get("/deliveries/area/:area", async (req, res, next) => {
  try {
    const deliveries = await GetDeliveriesByAreaUseCase(req.params.area);
    res.json(deliveries);
  } catch (error) {
    next(error);
  }
});

export default router;
