import UserRepository from "../../../APPLICATION/interfaces/repositories/database/UserRepository.js";
import renameMongoIdFields from "../presenters/renameMongoIdFields.js";

export default class MongoUserRepository extends UserRepository {
  constructor(
    userRepo,
    consumerProfileRepo,
    deliveryPersonProfileRepo,
    vendorProfileRepo
  ) {
    super();
    this.userRepo = userRepo;
    this.consumerProfileRepo = consumerProfileRepo;
    this.deliveryPersonProfileRepo = deliveryPersonProfileRepo;
    this.vendorProfileRepo = vendorProfileRepo;
  }

  async createUser(userData) {
    try {
      const { id, ...restOfUserData } = userData;
      const user = new this.userRepo({ _id: id, ...restOfUserData });
      const savedUser = await user.save();
      return renameMongoIdFields(savedUser.toObject());
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      return await this.userRepo.findById(id).lean();
    } catch (error) {
      throw error;
    }
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

  async hasUserProfile(userId) {
    try {
      const hasConsumerProfile = !!(await this.consumerProfileRepo.exists({
        userId,
      }));

      const hasDeliveryPersonProfile =
        !!(await this.deliveryPersonProfileRepo.exists({
          userId,
        }));

      const hasVendorProfile = !!(await this.vendorProfileRepo.exists({
        userId,
      }));

      return hasConsumerProfile || hasDeliveryPersonProfile || hasVendorProfile;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, updateData) {
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
