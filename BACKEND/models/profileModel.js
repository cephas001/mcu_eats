import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["consumer", "delivery_person", "vendor"],
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // To allow for flexible data structure
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
