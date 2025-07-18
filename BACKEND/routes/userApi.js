import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import admin from "../firebaseConnection.js";

import verifyToken from "../middlewares/verifyToken.js";

import sendVerificationEmail from "../utils/sendVerificationEmail.js";

import Users from "../models/userModel.js";

import express from "express";

const router = express.Router();
import { getAuth } from "firebase-admin/auth";

import { createUserUseCase, updateUserUseCase } from "../services/index.js";

router.post("/users", async (req, res) => {
  try {
    const user = await createUserUseCase(req.body.userData);
    res.json(user);
  } catch (error) {
    throw error;
  }
});

router.put("/users/:id", verifyToken, async (req, res) => {
  try {
    const { id, userData } = req.body;

    const user = await updateUserUseCase(id, userData);
    res.json(user);
  } catch (error) {
    throw error;
  }
});

// NOT REFACTORED

router.get("/users/:id", verifyToken, async (req, res) => {
  const user = await Users.findById({ _id: req.params.id }).lean();

  if (user) {
    res.json({ found: true, user });
  } else {
    res.json({ found: false, message: "User not found" });
  }
});

router.put("/users/favourites/:id", verifyToken, async (req, res) => {
  try {
    // Updates a user's favourite vendors. Entire list should be sent from frontend as this just resets it
    if (req.body.favouriteVendors) {
      const { favouriteVendors } = req.body;
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        { favouriteVendors },
        { new: true, runValidators: true }
      );

      res.json({ update: true, user: updatedUser });
    }

    // Update a user's favourite products. Entire list should be send from frontend as this just resets it.
    if (req.body.favouriteProducts) {
      const { favouriteProducts } = req.body;
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        { favouriteProducts },
        { new: true, runValidators: true }
      );

      res.json({ update: true, user: updatedUser });
    }
  } catch (error) {
    console.log(error);
    res.json({ update: false, message: "An error occurred" });
  }
});

router.post("/users/verifyEmail/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.uid !== req.params.id) {
      return res
        .status(401)
        .json({ update: false, message: "Mismatched credentials" });
    }

    const actionCodeSettings = {
      url: `https://super-journey-5p95pj5grgwf7xvq-3000.app.github.dev/redirected?from=${req.body.url}&mode=verifyEmail&id=${req.params.id}`,
      handleCodeInApp: false,
    };
    const auth = getAuth(admin.app());
    const link = await auth.generateEmailVerificationLink(
      req.body.email,
      actionCodeSettings
    );
    const sent = await sendVerificationEmail(
      req.body.email,
      req.body.fullName,
      link
    );
    res.json({ sent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// To get the raw firebase user object
router.get("/loggedInUser", verifyToken, async (req, res) => {
  const user = await Users.findById({ _id: req.user.uid }).lean();

  const userToSend = { ...user, picture: req.user.picture };

  if (user) {
    res.json({ found: true, user: userToSend });
  } else {
    res.json({ found: false, message: "User not found" });
  }
});

router.get("/loggedInUserFirebaseDetails", verifyToken, async (req, res) => {
  res.json({ found: true, user: req.user });
});

export default router;
