import mongoose from "mongoose";

const OrderProductSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const OrderProductsSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  vendorUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorUser",
    required: true,
  },
  products: [OrderProductSchema],
});

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderCode: {
      type: String,
      required: true,
    },
    orderProducts: [OrderProductsSchema],
    orderStatus: {
      state: {
        type: String,
        enum: ["Opened", "Assigned", "In Transit", "Delivered", "Closed"],
        required: true,
      },
      updatedAt: {
        type: Date,
        default: Date.now(),
      },
    },
    payment: {
      method: { type: String, enum: ["Card", "Bank Transfer"], required: true },
      status: {
        type: String,
        enum: ["Paid", "Processing", "Refunded"],
        required: true,
      },
      transactionId: { type: String },
    },
    delivery: {
      address: {
        type: String,
      },
      coordinates: {
        latitude: {
          type: Number,
        },
        longtitude: {
          type: Number,
        },
      },
    },
    deliveryPerson: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryUser",
      },
      name: {
        type: String,
      },
      contact: {
        type: String,
      },
    },
    estimatedDeliveryTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Order", OrderSchema);

export default Orders;
