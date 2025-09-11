import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import express from "express";
const router = express.Router();

import {
  createUserProfileUseCase,
  getProfilesDataByProfileIdsUseCase,
  getProfilesDataByTypeUseCase,
  getUserProfilesUseCase,
  updateUserProfileUseCase,
} from "../services/index.js";

router.post("/profile", async (req, res) => {
  try {
    const profileData = req.body?.profileData;
    const { savedProfile, updatedUser } = await createUserProfileUseCase(
      profileData
    );
    res.status(200).json({ savedProfile, updatedUser });
  } catch (error) {
    throw error;
  }
});

router.post("/user/profiles", async (req, res) => {
  try {
    const userId = req.body?.userId;
    const profileTypes = req.body?.profileTypes;

    const profileData = await getUserProfilesUseCase(userId, profileTypes);

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

router.put("/user/profile", async (req, res) => {
  const userId = req.body?.userId;
  const profileType = req.body?.profileType;
  const profileId = req.body?.profileId;
  const dataToUpdateUserProfileWith = req.body?.data;

  const updatedUserProfile = await updateUserProfileUseCase({
    userId,
    profileType,
    profileId,
    dataToUpdateUserProfileWith,
  });

  res.json(updatedUserProfile);
});

export default router;
