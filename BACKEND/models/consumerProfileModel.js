import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Subschemas for embedded arrays
const favoriteSchema = new Schema(
  {
    itemId: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  { _id: false }
);

const addressSchema = new Schema(
  {
    id: {
      type: String,
    },
    address: {
      type: String,
      required: true,
      minlength: 1,
    },
    tag: {
      type: String,
    },
  },
  { _id: false }
);

const noteSchema = new Schema(
  {
    id: {
      type: String,
    },
    note: {
      type: String,
      required: true,
      minlength: 1,
    },
    type: {
      type: String,
      enum: ["delivery", "pickup"],
      required: true,
    },
  },
  { _id: false }
);

const consumerProfileSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["consumer"],
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      minlength: 4,
      match: /^[^\d]/,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    hostel: {
      type: String,
      required: true,
      minlength: 1,
    },
    roomNumber: {
      type: String,
      required: true,
      minlength: 1,
    },
    college: {
      type: String,
      minlength: 1,
    },
    officeNumber: {
      type: String,
      minlength: 1,
    },
    favorites: {
      type: [favoriteSchema],
      default: [],
    },
    addresses: {
      type: [addressSchema],
      default: [],
    },
    notes: {
      type: [noteSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const ConsumerProfile = model("ConsumerProfile", consumerProfileSchema);

export default ConsumerProfile;
