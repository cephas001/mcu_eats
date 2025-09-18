import express from "express";
const router = express.Router();

import {
  ScheduleNotificationUseCase,
  SendEmailNotificationUseCase,
  SendPushNotificationUseCase,
  SendSMSNotificationUseCase,
  SubscribeToTopicUseCase,
  UnsubscribeFromTopicUseCase,
} from "../services/index.js";

// Schedule a notification to be sent later
router.post("/notifications/schedule", async (req, res, next) => {
  try {
    const { recipientId, type, message, scheduledTime } = req.body;
    await ScheduleNotificationUseCase({
      recipientId,
      type,
      message,
      scheduledTime,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// Send an email notification immediately
router.post("/notifications/email", async (req, res, next) => {
  try {
    const { to, subject, body } = req.body;
    await SendEmailNotificationUseCase({ to, subject, body });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// Send a push notification
router.post("/notifications/push", async (req, res, next) => {
  try {
    const { deviceToken, title, message } = req.body;
    await SendPushNotificationUseCase({ deviceToken, title, message });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// Send an SMS notification
router.post("/notifications/sms", async (req, res, next) => {
  try {
    const { phoneNumber, message } = req.body;
    await SendSMSNotificationUseCase({ phoneNumber, message });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// Subscribe a user to a topic
router.post("/notifications/subscribe", async (req, res, next) => {
  try {
    const { userId, topic } = req.body;
    await SubscribeToTopicUseCase({ userId, topic });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Unsubscribe a user from a topic
router.post("/notifications/unsubscribe", async (req, res, next) => {
  try {
    const { userId, topic } = req.body;
    await UnsubscribeFromTopicUseCase({ userId, topic });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
