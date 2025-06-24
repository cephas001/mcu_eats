const mongoose = require("mongoose");

const VendorUserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    taking_orders: {
      type: Boolean,
    },
    opening_time: {
      hour: Number,
      minute: Number,
    },
    closing_time: {
      hour: Number,
      minute: Number,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    location: {
      latitutude: {
        type: Number,
      },
      longtitude: {
        type: Number,
      },
    },
    accountDetails: {
      accountDetails: {
        bankName: { type: String },
        accountNumber: { type: String },
        accountHolderName: { type: String },
      },
    },
    pendingOrders: [
      {
        order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
        issuedAt: {
          type: Date,
        },
      },
    ],
    activeOrders: [
      {
        order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
        pickedUpAt: {
          type: Date,
        },
      },
    ],
    completedOrders: [
      {
        order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
        completedOn: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

const VendorUsers = mongoose.model("VendorUser", VendorUserSchema);

module.exports = VendorUsers;
