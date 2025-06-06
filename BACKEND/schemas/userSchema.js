const connection = require("../dbConnection");
const mongoose = require("mongoose");

const FavouritesSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: String,
  description: String,
  price: Number,
  type: String,
});

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    verifiedEmail: {
      type: Boolean,
    },
    gender: {
      type: String,
      required: true,
    },
    college: {
      type: String,
    },
    officeNumber: {
      type: Number,
    },
    hostel: {
      type: String,
    },
    roomNumber: {
      type: Number,
    },
    favourites: [FavouritesSchema],
  },
  { timestamps: true }
);

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
