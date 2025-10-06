import ConsumerRepository from "../../../APPLICATION/interfaces/repositories/database/ConsumerRepository.js";
import renameMongoIdFields from "../presenters/renameMongoIdFields.js";

export default class MongoConsumerRepository extends ConsumerRepository {
  constructor(userRepo, consumerProfileRepo) {
    super();
    this.userRepo = userRepo;
    this.consumerProfileRepo = consumerProfileRepo;
  }

  async createConsumer(profileData) {
    try {
      const consumerProfile = new this.consumerProfileRepo(profileData);

      const savedProfile = await consumerProfile.save();

      return {
        savedProfile: renameMongoIdFields(savedProfile.toObject()),
        profileId: savedProfile._id,
      };
    } catch (error) {
      throw error;
    }
  }

  async getConsumerById(profileId) {
    try {
      const consumer = await this.consumerProfileRepo
        .findById(profileId)
        .lean();

      return renameMongoIdFields(consumer);
    } catch (error) {
      throw error;
    }
  }

  async getConsumers() {
    try {
      const vendors = await this.consumerProfileRepo.find({}).lean();

      return renameMongoIdFields(vendors);
    } catch (error) {
      throw error;
    }
  }

  async linkProductToVendor(vendorId, createdProductId) {}

  async unlinkProductFromVendor(vendorId, productId) {}

  async unlinkMultipleProductsFromVendor(vendorId, productIds) {}

  async updateConsumer(profileId, consumerData) {
    try {
      const updatedProfile = await this.consumerProfileRepo.findByIdAndUpdate(
        profileId,
        { $set: consumerData },
        { new: true, runValidators: true }
      );

      if (!updatedProfile) {
        throw new Error(`Consumer profile with ID ${profileId} not found`);
      }

      return renameMongoIdFields(updatedProfile);
    } catch (error) {
      throw error;
    }
  }
}
