import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import express from "express";
const router = express.Router();

import {
  createProfileUseCase,
  createGetProfilesDataUseCase,
} from "../services/index.js";

router.post("/profile", async (req, res) => {
  try {
    const { savedProfile, updatedUser } = await createProfileUseCase(req.body);
    res.status(200).json({ savedProfile, updatedUser });
  } catch (error) {
    throw error;
  }
});

router.post("/profile-data", async (req, res) => {
  try {
    const { profileIds } = req.body;
    const profileData = await createGetProfilesDataUseCase(profileIds);

    res.json(profileData);
  } catch (error) {
    throw error;
  }
});
export default router;
