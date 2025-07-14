import mongoose from "mongoose";

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
    email: {
      type: String,
    },
    verifiedEmail: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["staff", "student", "visitor"],
    },
    profiles: {
      type: [ProfileRefSchema],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
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

export default User;
