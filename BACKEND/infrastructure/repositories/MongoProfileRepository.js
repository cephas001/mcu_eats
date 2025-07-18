import ProfileRepository from "../../../APPLICATION/interfaces/repositories/ProfileRepository.js";

export default class MongoProfileRepository extends ProfileRepository {
  constructor(userRepo, profileRepo) {
    super();
    this.userRepo = userRepo;
    this.profileRepo = profileRepo;
  }

  async createProfile(profileData) {
    try {
      const profile = new this.profileRepo(profileData);
      const savedProfile = await profile.save();
      const { _id, ...restOfSavedProfile } = savedProfile.toObject();

      return {
        savedProfile: { id: _id, ...restOfSavedProfile },
        profileId: savedProfile._id,
      };
    } catch (error) {
      throw error;
    }
  }

  async existsByUserIdAndType(userId, type) {
    try {
      return await this.profileRepo.findOne({ userId, type });
    } catch (error) {
      throw error;
    }
  }

  async getProfilesData(profileIds) {
    try {
      const profilesData = await Promise.all(
        profileIds.map((profileId) =>
          this.profileRepo.findById(profileId).lean()
        )
      );
      const idMappedProfilesData = profilesData.map(
        ({ _id, ...restOfData }) => {
          return { ...restOfData, id: _id };
        }
      );
      return idMappedProfilesData;
    } catch (error) {
      throw error;
    }
  }
}
