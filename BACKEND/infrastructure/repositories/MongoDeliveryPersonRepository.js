import DeliveryPersonRepository from "../../../APPLICATION/interfaces/repositories/database/DeliveryPersonRepository.js";
import renameMongoIdFields from "../presenters/renameMongoIdFields.js";

export default class MongoDeliveryPersonRepository extends DeliveryPersonRepository {
  constructor(userRepo, deliveryPersonProfileRepo) {
    super();
    this.userRepo = userRepo;
    this.deliveryPersonProfileRepo = deliveryPersonProfileRepo;
  }

  async createDeliveryPerson(profileData) {
    try {
      const deliveryPersonProfile = new this.deliveryPersonProfileRepo(
        profileData
      );

      const savedProfile = await deliveryPersonProfile.save();

      return {
        savedProfile: renameMongoIdFields(savedProfile.toObject()),
        profileId: savedProfile._id,
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(deliveryPersonId) {}

  async getDeliveryPersons() {
    try {
      const deliveryPersons = await this.deliveryPersonProfileRepo
        .find({})
        .lean();

      return renameMongoIdFields(deliveryPersons);
    } catch (error) {
      throw error;
    }
  }
}
