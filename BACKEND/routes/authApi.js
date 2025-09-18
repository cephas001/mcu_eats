import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import express from "express";
const router = express.Router();

import {
  LoginUserFullAuthFlowUseCase,
  VerifyTokenUseCase,
  GetUserByEmailUseCase,
  ConfirmEmailUseCase,
  ChangePasswordUseCase,
  RefreshTokenUseCase,
  ResendConfirmationEmailUseCase,
  ResetPasswordUseCase,
  SendPasswordResetLinkUseCase,
} from "../services/index.js";

// Authenticate user with full login flow
router.post("/auth/login", async (req, res, next) => {
  try {
    const { auth_token } = req.cookies || req.body;
    const user = await LoginUserFullAuthFlowUseCase(auth_token);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Verify authentication token (e.g. JWT)
router.post("/auth/verify-token", async (req, res, next) => {
  try {
    const { auth_token } = req.cookies || req.body;
    const { id, email, verifiedEmail } = await VerifyTokenUseCase(auth_token);
    res.json({ id, email, verifiedEmail });
  } catch (error) {
    next(error);
  }
});

// Retrieve user by email (secure lookup)
router.post("/auth/users/lookup-by-email", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await GetUserByEmailUseCase(email);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Confirm user's email address
router.post("/auth/confirm-email", async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await ConfirmEmailUseCase(email);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Refresh authentication token
router.post("/auth/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies || req.body;
    const newToken = await RefreshTokenUseCase(refreshToken);
    res.json({ token: newToken });
  } catch (error) {
    next(error);
  }
});

// Resend email confirmation
router.post("/auth/resend-confirmation-email", async (req, res, next) => {
  try {
    const { email } = req.body;
    await ResendConfirmationEmailUseCase(email);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Send password reset link
router.post("/auth/send-password-reset-link", async (req, res, next) => {
  try {
    const { email } = req.body;
    await SendPasswordResetLinkUseCase(email);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
