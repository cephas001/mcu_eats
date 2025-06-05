require("dotenv").config({ path: "../config/config.env" });
const express = require("express");
const router = express.Router();
const Users = require("../schemas/userSchema");
const verifyToken = require("../middlewares/verifyToken");

router.post("/users", async (req, res) => {
  const user = await Users.findById({ _id: req.body.id });
  if (!user) {
    const userToAdd = {
      _id: req.body.id,
      gender: req.body.gender,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      type: req.body.type,
      role: req.body.role,
      email: req.body.email,
      verifiedEmail: req.body.emailVerified,
      favourites: req.body.favourites,
      type: req.body.type,
      ...(req.body.college && { college: req.body.college }),
      ...(req.body.officeNumber && { officeNumber: req.body.officeNumber }),
      ...(req.body.roomNumber && { roomNumber: req.body.roomNumber }),
      ...(req.body.hostel && { hostel: req.body.hostel }),
    };

    const response = await Users.create(userToAdd);
    if (response) {
      res.status(200).json({ added: true, message: "User added successfully" });
    }
  } else {
    res.status(409).json({ added: false, message: "User already exists" });
  }
});

router.get("/users/:id", async (req, res) => {
  const user = await Users.findById({ _id: req.params.id }).lean();

  if (user) {
    res.json({ found: true, user });
  } else {
    res.json({ found: false, message: "User not found" });
  }
});

router.get("/loggedInUser", verifyToken, async (req, res) => {
  const user = await Users.findById({ _id: req.user.uid }).lean();

  const userToSend = { ...user, picture: req.user.picture };

  if (user) {
    res.json({ found: true, user: userToSend });
  } else {
    res.json({ found: false, message: "User not found" });
  }
});

module.exports = router;
