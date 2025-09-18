import VendorRepository from "../../../APPLICATION/interfaces/repositories/database/VendorRepository.js";
import renameMongoIdFields from "../presenters/renameMongoIdFields.js";
import { vendorProfilePresenter } from "../presenters/profilePresenters.js";

export default class MongoVendorRepository extends VendorRepository {
  constructor(userRepo, vendorProfileRepo) {
    super();
    this.userRepo = userRepo;
    this.vendorProfileRepo = vendorProfileRepo;
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
}
