const mongoose = require("mongoose");

const ProfileRefSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["consumer", "delivery_person", "vendor"],
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "Profile", // This makes it dynamic based on the `type`
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    profiles: {
      type: [ProfileRefSchema],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
    lastLogin: {
      type: String,
    },
  },
  { timestamps: false }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
