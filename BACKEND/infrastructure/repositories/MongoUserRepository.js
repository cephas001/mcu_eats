import UserRepository from "../../../APPLICATION/interfaces/repositories/UserRepository.js";

export default class MongoUserRepository extends UserRepository {
  constructor(userRepo, profileRepo) {
    super();
    this.userRepo = userRepo;
    this.profileRepo = profileRepo;
  }

  async create(userData) {
    try {
      const { id, ...restOfUserData } = userData;
      const user = new this.userRepo({ _id: id, ...restOfUserData });
      const savedUser = await user.save();
      const { _id, ...restOfSavedUser } = savedUser.toObject();
      return { id: _id, ...restOfSavedUser };
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async findById(id) {
    return await this.userRepo.findById(id).lean();
  }

  async linkProfile(userId, profileId) {
    try {
      const profile = await this.profileRepo.findById(profileId);
      if (!profile) {
        throw new Error("Profile not found");
      }

      const updatedUser = await this.userRepo
        .findByIdAndUpdate(
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
        )
        .lean();

      const { _id, ...restOfUpdatedUser } = updatedUser;
      return { id: _id, ...restOfUpdatedUser };
    } catch (error) {
      throw error;
    }
  }

  async userHasProfile(user) {
    try {
      const hasProfile = !!(await this.profileRepo.exists({
        userId: user._id,
      }));

      return hasProfile;
    } catch (error) {
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      const user = await this.userRepo.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!user) return null;

      const { _id, ...rest } = user.toObject?.() || user;
      return { ...rest, id: _id };
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    const res = await this.userRepo.deleteOne({ _id: id });
    return res.deletedCount > 0;
  }
}
