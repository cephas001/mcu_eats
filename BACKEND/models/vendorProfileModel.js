import mongoose from "mongoose";

const { Schema, model } = mongoose;

const timeSchema = new Schema(
  {
    hour: {
      type: Number,
      required: true,
      min: 0,
      max: 23,
    },
    minute: {
      type: Number,
      required: true,
      min: 0,
      max: 59,
    },
  },
  { _id: false }
);

const locationSchema = new Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const accountDetailsSchema = new Schema(
  {
    bankName: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    accountHolderName: {
      type: String,
    },
  },
  { _id: false }
);

const orderRefSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  { _id: false }
);

const pendingOrderSchema = new Schema(
  {
    ...orderRefSchema.obj,
    issuedAt: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

const activeOrderSchema = new Schema(
  {
    ...orderRefSchema.obj,
    pickedUpAt: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

const completedOrderSchema = new Schema(
  {
    ...orderRefSchema.obj,
    completedOn: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

const vendorProfileSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["vendor"],
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    vendorName: {
      type: String,
      required: true,
      minlength: 1,
      match: /^[^0-9]*$/,
    },
    bannerImage: {
      type: String,
      required: false,
    },
    vendorType: {
      type: String,
      enum: ["restaurant", "retailer", "shop"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
    },
    businessNumber: {
      type: String,
      required: true,
      match: /^0[789][01]\d{8}$/,
    },
    businessEmail: {
      type: String,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    category: {
      type: String,
      enum: [
        "pastries",
        "snacks and grills",
        "stationeries",
        "quick meals",
        "swallow and more",
        "electronics",
      ],
      required: true,
    },
    takingOrders: {
      type: Boolean,
      default: false,
    },
    openingTime: {
      type: timeSchema,
      required: true,
    },
    closingTime: {
      type: timeSchema,
      required: true,
    },
    address: {
      type: String,
      required: true,
      minlength: 1,
    },
    products: {
      type: [String],
      default: [],
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    location: {
      type: locationSchema,
      required: false,
    },
    accountDetails: {
      type: accountDetailsSchema,
      required: false,
    },
    pendingOrders: {
      type: [pendingOrderSchema],
      default: [],
    },
    activeOrders: {
      type: [activeOrderSchema],
      default: [],
    },
    completedOrders: {
      type: [completedOrderSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const VendorProfile = model("VendorProfile", vendorProfileSchema);

export default VendorProfile;
