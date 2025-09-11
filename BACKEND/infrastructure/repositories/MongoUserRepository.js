import UserRepository from "../../../APPLICATION/interfaces/repositories/database/UserRepository.js";

export default class MongoUserRepository extends UserRepository {
  constructor(
    userRepo,
    profileRepo,
    consumerProfileRepo,
    deliveryPersonProfileRepo,
    vendorProfileRepo
  ) {
    super();
    this.userRepo = userRepo;
    this.profileRepo = profileRepo;
    this.consumerProfileRepo = consumerProfileRepo;
    this.deliveryPersonProfileRepo = deliveryPersonProfileRepo;
    this.vendorProfileRepo = vendorProfileRepo;
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

  async linkProfileToUser(userId, profileId, profileType) {
    try {
      const updatedUser = await this.userRepo
        .findByIdAndUpdate(
          userId,
          {
            $push: {
              profiles: {
                profileId,
                type: profileType,
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
      const hasConsumerProfile = !!(await this.consumerProfileRepo.exists({
        userId: user._id,
      }));

      const hasDeliveryPersonProfile =
        !!(await this.deliveryPersonProfileRepo.exists({
          userId: user._id,
        }));

      const hasVendorProfile = !!(await this.vendorProfileRepo.exists({
        userId: user._id,
      }));

      return hasConsumerProfile || hasDeliveryPersonProfile || hasVendorProfile;
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
