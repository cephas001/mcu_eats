import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import express from "express";
const router = express.Router();

import {
  BanUserUseCase,
  CreateUserUseCase,
  DeactivateUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  ListUsersByRoleUseCase,
  ReactivateUserUseCase,
  SearchUsersUseCase,
  UnbanUserUseCase,
  UpdateUserUseCase,
} from "../services/index.js";

// Create a new user
router.post("/users", async (req, res, next) => {
  try {
    const { userData } = req.body;
    const user = await CreateUserUseCase(userData);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await GetUserByIdUseCase(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Delete a user
router.delete("/users/:id", async (req, res, next) => {
  try {
    await DeleteUserUseCase(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Update user details
router.patch("/users/:id", async (req, res, next) => {
  try {
    const updates = req.body;
    const updatedUser = await UpdateUserUseCase(req.params.id, updates);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// Deactivate a user
router.post("/users/:id/deactivate", async (req, res, next) => {
  try {
    await DeactivateUserUseCase(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Reactivate a user
router.post("/users/:id/reactivate", async (req, res, next) => {
  try {
    await ReactivateUserUseCase(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Ban a user
router.post("/users/:id/ban", async (req, res, next) => {
  try {
    const { reason } = req.body;
    await BanUserUseCase(req.params.id, reason);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Unban a user
router.post("/users/:id/unban", async (req, res, next) => {
  try {
    await UnbanUserUseCase(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// List users by role
router.get("/users/role/:role", async (req, res, next) => {
  try {
    const users = await ListUsersByRoleUseCase(req.params.role);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Search users by query
router.post("/users/search", async (req, res, next) => {
  try {
    const { query } = req.body;
    const results = await SearchUsersUseCase(query);
    res.json(results);
  } catch (error) {
    next(error);
  }
});

export default router;
