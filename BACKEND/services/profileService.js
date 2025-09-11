import MongoProfileRepository from "../infrastructure/repositories/MongoProfileRepository.js";
import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";

import createUserProfile from "../../APPLICATION/usecases/profile/repositories/database/createUserProfile.js";
import getProfilesDataByProfileIds from "../../APPLICATION/usecases/profile/repositories/database/getProfilesDataByProfileIds.js";
import getProfilesDataByType from "../../APPLICATION/usecases/profile/repositories/database/getProfilesDataByType.js";
import getVendorProfiles from "../../APPLICATION/usecases/profile/repositories/database/getVendorProfiles.js";
import getUserProfiles from "../../APPLICATION/usecases/profile/repositories/database/getUserProfiles.js";
import updateUserProfile from "../../APPLICATION/usecases/profile/repositories/database/updateUserProfile.js";

import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";
import ConsumerProfile from "../models/consumerProfileModel.js";
import DeliveryPersonProfile from "../models/deliveryPersonProfileModel.js";
import VendorProfile from "../models/vendorProfileModel.js";

const profileRepo = new MongoProfileRepository(
  User,
  Profile,
  ConsumerProfile,
  DeliveryPersonProfile,
  VendorProfile
);
const userRepo = new MongoUserRepository(User, Profile);

export const createUserProfileUseCase = createUserProfile(
  profileRepo,
  userRepo
);
export const getProfilesDataByProfileIdsUseCase =
  getProfilesDataByProfileIds(profileRepo);
export const getProfilesDataByTypeUseCase = getProfilesDataByType(
  userRepo,
  profileRepo
);
export const getVendorProfilesUseCase = getVendorProfiles(profileRepo);
export const getUserProfilesUseCase = getUserProfiles(profileRepo);
export const updateUserProfileUseCase = updateUserProfile(
  userRepo,
  profileRepo
);
