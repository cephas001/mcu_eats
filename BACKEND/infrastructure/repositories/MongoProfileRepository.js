import ProfileRepository from "../../../APPLICATION/interfaces/repositories/database/ProfileRepository.js";
import renameMongoIdFields from "../presenters/renameMongoIdFields.js";

export default class MongoProfileRepository extends ProfileRepository {
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
    this.repoMap = {
      consumer: this.consumerProfileRepo,
      delivery_person: this.deliveryPersonProfileRepo,
      vendor: this.vendorProfileRepo,
    };
  }

  async createConsumerProfile(profileData) {
    try {
      const consumerProfile = new this.consumerProfileRepo(profileData);

      const savedProfile = await consumerProfile.save();

      return {
        savedProfile: renameMongoIdFields(savedProfile),
        profileId: savedProfile._id,
      };
    } catch (error) {
      throw error;
    }
  }

  // async createConsumerProfile(profileData) {
  //   try {
  //     const consumerProfile = new this.consumerProfileRepo(profileData);

  //     const savedProfile = await consumerProfile.save();

  //     return {
  //       savedProfile: renameMongoIdFields(savedProfile),
  //       profileId: savedProfile._id,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async createDeliveryPersonProfile(profileData) {
  //   try {
  //     const deliveryPersonProfile = new this.deliveryPersonProfileRepo(
  //       profileData
  //     );
  //     const savedProfile = await deliveryPersonProfile.save();

  //     return {
  //       savedProfile: renameMongoIdFields(savedProfile),
  //       profileId: savedProfile._id,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async createVendorProfile(profileData) {
  //   try {
  //     const vendorProfile = new this.vendorProfileRepo(profileData);
  //     const savedProfile = await vendorProfile.save();

  //     return {
  //       savedProfile: renameMongoIdFields(savedProfile),
  //       profileId: savedProfile._id,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async createUserProfile(type, profileData) {
    try {
      const repo = this.repoMap[type];

      const profile = new repo(profileData);

      const savedProfile = await profile.save();

      return {
        savedProfile: renameMongoIdFields(savedProfile),
        profileId: savedProfile._id,
      };
    } catch (error) {
      throw error;
    }
  }

  async getProfileByUserIdAndType(userId, type) {
    try {
      if (type === "consumer") {
        return await this.consumerProfileRepo.findOne({ userId, type });
      } else if (type === "delivery_person") {
        return await this.deliveryPersonProfileRepo.findOne({ userId, type });
      } else if (type === "vendor") {
        return await this.vendorProfileRepo.findOne({ userId, type });
      }
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
      const repo = this.repoMap[type];

      const profiles = await repo.find({ type }).lean();

      const formattedProfiles = profiles.map((profile) => {
        const { _id, ...restOfProfile } = profile;
        return {
          id: _id,
          ...restOfProfile,
        };
      });
      return formattedProfiles;
    } catch (error) {
      throw error;
    }
  }

  async updateUserProfile(profileId, profileType, dataToUpdateProfileWith) {
    try {
      const repo = this.repoMap[profileType];

      const updatedProfile = await repo
        .findByIdAndUpdate(profileId, dataToUpdateProfileWith, {
          new: true,
        })
        .lean();

      return renameMongoIdFields(updatedProfile);
    } catch (error) {
      throw error;
    }
  }

  async findUserProfileById(profileId) {
    try {
      const profile = await this.profileRepo.findById(profileId).lean();
      if (!profile) return null;

      const { _id, ...restOfProfile } = profile;
      return { id: _id, ...restOfProfile };
    } catch (error) {
      throw error;
    }
  }

  async getUserProfiles(userId) {
    const repoMap = {
      consumer: this.consumerProfileRepo,
      delivery_person: this.deliveryPersonProfileRepo,
      vendor: this.vendorProfileRepo,
    };

    const profiles = [];

    for (const [type, repo] of Object.entries(repoMap)) {
      if (repo) {
        const profile = await repo.findOne({ userId }).lean();
        if (profile) {
          profiles.push(renameMongoIdFields(profile));
        }
      }
    }

    return profiles;
  }
}
