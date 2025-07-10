import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: String,
  description: String,
  price: Number,
  productType: String,
});

const VendorSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    ref: "Vendor",
  },
  vendorName: {
    type: String,
    required: true,
  },
  vendorType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  takingOrders: {
    type: Boolean,
  },
  openingTime: {
    hour: Number,
    minute: Number,
  },
  closingTime: {
    hour: Number,
    minute: Number,
  },
  address: {
    type: String,
    required: true,
  },
  products: [ProductSchema],
  verificationStatus: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
  contactPhone: {
    type: String,
    required: true,
  },
  location: {
    latitude: Number,
    longitude: Number,
  },
  accountDetails: {
    bankName: String,
    accountNumber: String,
    accountName: String,
  },
  pendingOrders: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
      issuedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  activeOrders: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
      pickedUpAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  completedOrders: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
      completedOn: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Vendors = mongoose.model("Vendor", VendorSchema);

export default Vendors;
