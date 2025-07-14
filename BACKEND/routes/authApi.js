import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import express from "express";
const router = express.Router();

import {
  createLoginUserUseCase,
  createDeleteUserAuthUseCase,
  createVerifyTokenUseCase,
  createGetUserByEmailUseCase,
} from "../services/index.js";

router.post("/login", async (req, res) => {
  try {
    const { token } = req.body;
    const user = await createLoginUserUseCase(token);
    res.json(user);
  } catch (error) {
    throw error;
  }
});

router.post("/deleteUserAuth", async (req, res) => {
  try {
    const { id } = req.body;
    await createDeleteUserAuthUseCase(id);
    res.json({
      deleted: true,
    });
  } catch (error) {
    res.json({ deleted: false, message: error.message });
  }
});

router.post("/verifyToken", async (req, res) => {
  try {
    const { auth_token } = req.cookies || req.body;
    const token = auth_token;
    const { id, email, verifiedEmail } = await createVerifyTokenUseCase(token);
    res.json({ id, email, verifiedEmail });
  } catch (error) {
    throw error;
  }
});

router.post("/getUserByEmail", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await createGetUserByEmailUseCase(email);
    res.json(user);
  } catch (error) {
    return res.json(null);
  }
});

export default router;
