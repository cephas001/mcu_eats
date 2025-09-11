import mongoose from "mongoose";

const { Schema, model } = mongoose;

const locationSchema = new Schema(
  {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    // Add other shared fields here if needed
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

const deliveryPersonProfileSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["delivery_person"],
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
    },
    roomNumber: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 3,
    },
    college: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    matricNumber: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 10,
      match: /^\d+$/,
    },
    available: {
      type: Boolean,
      default: false,
    },
    penaltyPoints: {
      type: Number,
      default: 0,
      min: 0,
    },
    averageDeliveryTime: {
      type: Number,
      default: 1,
      min: 0,
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
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const DeliveryPersonProfile = model(
  "DeliveryPersonProfile",
  deliveryPersonProfileSchema
);

export default DeliveryPersonProfile;
