import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import express from "express";
const router = express.Router();

import {
  loginUserFullAuthFlowUseCase,
  deleteUserAuthUseCase,
  verifyTokenUseCase,
  getUserByEmailUseCase,
  getEmailVerificationLinkUseCase,
  getUserUseCase,
} from "../services/index.js";

import sendVerificationEmail from "../utils/sendVerificationEmail.js";

router.post("/login/full", async (req, res) => {
  try {
    const { auth_token } = req.cookies || req.body;
    const user = await loginUserFullAuthFlowUseCase(auth_token);
    res.json(user);
  } catch (error) {
    throw error;
  }
});

router.post("/auth/delete-user", async (req, res) => {
  try {
    const { id } = req.body;
    await deleteUserAuthUseCase(id);
    res.json({
      deleted: true,
    });
  } catch (error) {
    res.json({ deleted: false, message: error.message });
  }
});

router.post("/verify/token", async (req, res) => {
  try {
    const { auth_token } = req.cookies || req.body;
    const token = auth_token;
    const { id, email, verifiedEmail } = await verifyTokenUseCase(token);
    res.json({ id, email, verifiedEmail });
  } catch (error) {
    throw error;
  }
});

router.post("/get/user/email", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmailUseCase(email);
    res.json(user);
  } catch (error) {
    return res.json(null);
  }
});

router.post("/verify/email", async (req, res) => {
  try {
    const token = req.cookies?.auth_token || req.body?.auth_token;

    const { urlFrom, userId } = req.body;

    const { id, link } = await getEmailVerificationLinkUseCase(
      token,
      `${process.env.FRONTEND_URL}/redirected?from=${urlFrom}&mode=verifyEmail&id=${userId}`
    );

    const user = await getUserUseCase(id);
    console.log(link);
    const sent = await sendVerificationEmail(user.email, user.name, link);

    res.json(sent);
  } catch (error) {
    throw error;
  }
});

export default router;
