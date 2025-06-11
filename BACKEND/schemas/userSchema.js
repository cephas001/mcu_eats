const connection = require("../dbConnection");
const mongoose = require("mongoose");

const FavouriteVendorsSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
});

const FavouriteProductsSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const AddressesSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  address: String,
});

const NotesSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  note: String,
});

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
      type: Number,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    verifiedEmail: {
      type: Boolean,
    },
    gender: {
      type: String,
      required: true,
    },
    college: {
      type: String,
    },
    officeNumber: {
      type: Number,
    },
    hostel: {
      type: String,
    },
    roomNumber: {
      type: Number,
    },
    favouriteVendors: [FavouriteVendorsSchema],
    favouriteProducts: [FavouriteProductsSchema],
    addresses: [AddressesSchema],
    notes: [NotesSchema],
  },
  { timestamps: true }
);

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
