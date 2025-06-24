const mongoose = require("mongoose");

const DeliveryUserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "On Delivery", "Unavailable", "Offline"],
      default: "Unavailable",
    },
    location: {
      latitutude: {
        type: Number,
      },
      longtitude: {
        type: Number,
      },
    },
    assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    completedOrders: [
      {
        order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
        completedDate: {
          type: Date,
        },
      },
    ],
    earnings: {
      total: {
        type: Number,
        default: 0,
      },
      lastPaymentDate: { type: Date },
    },
    accountDetails: {
      bankName: { type: String },
      accountNumber: { type: String },
      accountHolderName: { type: String },
    },
  },
  { timestamps: true }
);

const DeliveryUsers = mongoose.model("DeliveryUser", DeliveryUserSchema);

module.exports = DeliveryUsers;
