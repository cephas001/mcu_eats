import MongoProfileRepository from "../infrastructure/repositories/MongoProfileRepository.js";
import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";

import createUserProfile from "../../APPLICATION/usecases/profile/repositories/database/createUserProfile.js";
import getProfilesDataByProfileIds from "../../APPLICATION/usecases/profile/repositories/database/getProfilesDataByProfileIds.js";
import getProfilesDataByType from "../../APPLICATION/usecases/profile/repositories/database/getProfilesDataByType.js";
import getVendorProfiles from "../../APPLICATION/usecases/profile/repositories/database/getVendorProfiles.js";

import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

const profileRepo = new MongoProfileRepository(User, Profile);
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
