const connection = require("../dbConnection");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: String,
  description: String,
  price: Number,
  type: String,
});

const VendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
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
    products: [ProductSchema],
  },
  { timestamps: true }
);

const Vendors = mongoose.model("Vendor", VendorSchema);

module.exports = Vendors;
