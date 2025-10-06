import VendorRepository from "../../../APPLICATION/interfaces/repositories/database/VendorRepository.js";
import renameMongoIdFields from "../presenters/renameMongoIdFields.js";
import { vendorProfilePresenter } from "../presenters/profilePresenters.js";

export default class MongoVendorRepository extends VendorRepository {
  constructor(userRepo, vendorProfileRepo) {
    super();
    this.userRepo = userRepo;
    this.vendorProfileRepo = vendorProfileRepo;
  }

  async createVendor(profileData) {
    try {
      const vendorProfile = new this.vendorProfileRepo(profileData);

      const savedProfile = await vendorProfile.save();

      return {
        savedProfile: renameMongoIdFields(savedProfile.toObject()),
        profileId: savedProfile._id,
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(profileId) {
    try {
      const profile = await this.vendorProfileRepo.findById(profileId).lean();

      return renameMongoIdFields(profile);
    } catch (error) {
      throw error;
    }
  }

  async getVendors() {
    try {
      const vendors = await this.vendorProfileRepo.find({}).lean();

      const vendorsToBePresented = vendorProfilePresenter(vendors);

      return renameMongoIdFields(vendorsToBePresented);
    } catch (error) {
      throw error;
    }
  }

  async getVendorById(profileId) {
    try {
      const vendor = await this.vendorProfileRepo.findById(profileId).lean();

      return renameMongoIdFields(vendor);
    } catch (error) {
      throw error;
    }
  }

  async updateVendor(profileId, vendorData) {
    try {
      const updatedProfile = await this.vendorProfileRepo.findByIdAndUpdate(
        profileId,
        { $set: vendorData },
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

  async linkProductToVendor(vendorId, createdProductId) {
    try {
      const updatedVendor = await this.vendorProfileRepo.findByIdAndUpdate(
        vendorId,
        { $addToSet: { products: createdProductId } },
        { new: true }
      );

      if (!updatedVendor) {
        throw new Error(`Vendor with ID ${vendorId} not found`);
      }

      return renameMongoIdFields(updatedVendor.toObject());
    } catch (error) {
      throw error;
    }
  }

  async unlinkProductFromVendor(vendorId, productId) {}

  async unlinkMultipleProductsFromVendor(vendorId, productIds) {}
}
