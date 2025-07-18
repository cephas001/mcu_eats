import MongoProfileRepository from "../infrastructure/repositories/MongoProfileRepository.js";
import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";
import createProfile from "../../APPLICATION/usecases/profile/createProfile.js";
import getProfilesData from "../../APPLICATION/usecases/profile/getProfilesData.js";

import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

const profileRepo = new MongoProfileRepository(User, Profile);
const userRepo = new MongoUserRepository(User, Profile);

export const createProfileUseCase = createProfile(profileRepo, userRepo);
export const createGetProfilesDataUseCase = getProfilesData(profileRepo);
