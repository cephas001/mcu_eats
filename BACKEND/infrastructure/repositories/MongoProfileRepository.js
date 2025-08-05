import ProfileRepository from "../../../APPLICATION/interfaces/repositories/database/ProfileRepository.js";

export default class MongoProfileRepository extends ProfileRepository {
  constructor(userRepo, profileRepo) {
    super();
    this.userRepo = userRepo;
    this.profileRepo = profileRepo;
  }

  async createUserProfile(profileData) {
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

  async getProfileByUserIdAndType(userId, type) {
    try {
      return await this.profileRepo.findOne({ userId, type });
    } catch (error) {
      throw error;
    }
  }

  async getProfilesDataByProfileIds(profileIds) {
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

  async getProfilesDataByType(type) {
    try {
      const profilesData = await this.profileRepo.find({ type });

      return profilesData;
    } catch (error) {
      throw error;
    }
  }
}
