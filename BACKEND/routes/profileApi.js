import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import express from "express";
const router = express.Router();

import {
  createUserProfileUseCase,
  getProfilesDataByProfileIdsUseCase,
  getProfilesDataByTypeUseCase,
} from "../services/index.js";

router.post("/profile", async (req, res) => {
  try {
    const { savedProfile, updatedUser } = await createUserProfileUseCase(
      req.body.profileData
    );
    res.status(200).json({ savedProfile, updatedUser });
  } catch (error) {
    throw error;
  }
});

router.post("/get/profile/data/profileIds", async (req, res) => {
  try {
    const profileIds = req.body?.profileIds;
    const profileData = await getProfilesDataByProfileIdsUseCase(profileIds);

    res.json(profileData);
  } catch (error) {
    throw error;
  }
});

router.post("/get/profile/data/type", async (req, res) => {
  try {
    const userId = req.body?.userId;
    const type = req.body?.type;

    const profileData = await getProfilesDataByTypeUseCase(userId, type);

    return res.json(profileData);
  } catch (error) {
    throw error;
  }
});

export default router;
