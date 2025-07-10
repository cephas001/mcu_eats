import Profile from "../../models/profileModel.js";
import User from "../../models/userModel.js";
import ProfileRepository from "../../../APPLICATION/interfaces/repositories/ProfileRepository.js";

export default class MongoProfileRepository extends ProfileRepository {
  constructor() {
    super();
  }

  async createProfile(profileData) {
    try {
      const profile = new Profile(profileData);
      const savedProfile = await profile.save();
      return {
        savedProfile,
        profileId: savedProfile._id,
      };
    } catch (error) {
      throw error;
    }
  }

  async existsByUserIdAndType(userId, type) {
    try {
      return await Profile.findOne({ userId, type });
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id) {
    return await User.findById(id);
  }

  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    const res = await User.deleteOne({ _id: id });
    return res.deletedCount > 0;
  }
}
