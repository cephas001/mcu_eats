import User from "../../models/userModel.js";
import Profile from "../../models/profileModel.js";
import UserRepository from "../../../APPLICATION/interfaces/repositories/UserRepository.js";

export default class MongoUserRepository extends UserRepository {
  constructor() {
    super();
  }

  async create(userData) {
    try {
      userData._id = userData.id;
      delete userData.id; // Remove id to avoid duplication
      const user = new User(userData);
      // Set the _id field to user.id if it exists
      return await user.save();
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async findById(id) {
    return await User.findById(id);
  }

  async linkProfile(userId, profileId) {
    try {
      const profile = await Profile.findById(profileId);
      if (!profile) {
        throw new Error("Profile not found");
      }

      return await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            profiles: {
              profileId: profile._id,
              type: profile.type,
            },
          },
        },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    const res = await User.deleteOne({ _id: id });
    return res.deletedCount > 0;
  }
}
