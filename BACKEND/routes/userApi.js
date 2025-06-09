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
      username: req.body.firstName + req.body.id.slice(-4),
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
    // Removes a favourite vendor from the user
    if (req.body.removeFavouriteVendor) {
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        { $pull: { favouriteVendors: { vendor: req.body.vendorId } } }, // Removes the entire object
        { new: true }
      );
      console.log("user", updatedUser);
      res.json({ update: true, user: updatedUser });
    }

    // Adds a favourite vendor to the user. Entire list should be sent from frontend as this just resets it
    if (req.body.favouriteVendors) {
      const { favouriteVendors } = req.body;
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        { favouriteVendors },
        { new: true, runValidators: true }
      );

      console.log(updatedUser);
      res.json({ update: true, user: updatedUser });
    }

    // Removes a favourite product from the user.
    if (req.body.removeFavouriteProduct) {
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        { $pull: { favouriteProducts: { productId: req.body.productId } } }, // Removes the entire object
        { new: true }
      );
      console.log(updatedUser);
      res.json({ update: true, user: updatedUser });
    }

    // Adds a favourite product to the user. Entire list should be send from frontend as this just resets it.
    if (req.body.favouriteProducts) {
      const { favouriteProducts } = req.body;
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        { favouriteProducts },
        { new: true, runValidators: true }
      );

      console.log(updatedUser);
      res.json({ update: true, user: updatedUser });
    }
  } catch (error) {
    console.log(error);
    res.json({ update: false, message: "An error occurred" });
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

module.exports = router;
