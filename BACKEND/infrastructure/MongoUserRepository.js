const User = require("../schemas/userSchema.js");
const UserRepository = require("../../APPLICATION/interfaces/UserRepository.js");

module.exports = class MongoUserRepository extends UserRepository {
  async create(userData) {
    try {
      if (userData.id) {
        userData._id = userData.id;
        delete userData.id; // Remove id to avoid duplication
      }
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

  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    const res = await User.deleteOne({ _id: id });
    return res.deletedCount > 0;
  }
};
