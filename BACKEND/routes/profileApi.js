import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import express from "express";
const router = express.Router();

import {
  DeleteProfileUseCase,
  DeleteProfilesByTypeUseCase,
  FindProfileByUserAndTypeUseCase,
  GetProfileByIdUseCase,
  GetProfilesByTypeUseCase,
  GetUserProfilesUseCase,
} from "../services/index.js";

// Get a profile by ID
router.get("/profiles/:profileId", async (req, res, next) => {
  try {
    const profile = await GetProfileByIdUseCase(req.params.profileId);
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

// Get all profiles for a user
router.get("/users/:userId/profiles", async (req, res, next) => {
  try {
    const profiles = await GetUserProfilesUseCase(req.params.userId);
    res.json(profiles);
  } catch (error) {
    next(error);
  }
});

// Get profiles by type
router.get("/profiles/type/:type", async (req, res, next) => {
  try {
    const profiles = await GetProfilesByTypeUseCase(req.params.type);
    res.json(profiles);
  } catch (error) {
    next(error);
  }
});

// Find a profile by user and type
router.get("/users/:userId/profiles/type/:type", async (req, res, next) => {
  try {
    const profile = await FindProfileByUserAndTypeUseCase(
      req.params.userId,
      req.params.type
    );
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

// Delete a profile by ID
router.delete("/profiles/:profileId", async (req, res, next) => {
  try {
    await DeleteProfileUseCase(req.params.profileId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Delete all profiles of a specific type
router.delete("/profiles/type/:type", async (req, res, next) => {
  try {
    await DeleteProfilesByTypeUseCase(req.params.type);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
