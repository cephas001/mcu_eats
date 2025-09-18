import * as ProfileUseCases from "../../APPLICATION/usecases/profile/index.js";

import MongoProfileRepository from "../infrastructure/repositories/MongoProfileRepository.js";
import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";

import User from "../models/userModel.js";
import ConsumerProfile from "../models/consumerProfileModel.js";
import DeliveryPersonProfile from "../models/deliveryPersonProfileModel.js";
import VendorProfile from "../models/vendorProfileModel.js";

const profileRepo = new MongoProfileRepository(
  User,
  ConsumerProfile,
  DeliveryPersonProfile,
  VendorProfile
);
const userRepo = new MongoUserRepository(User);

export const DeleteProfileUseCase = ProfileUseCases.DeleteProfile();
export const DeleteProfilesByTypeUseCase =
  ProfileUseCases.DeleteProfilesByType();
export const FindProfileByUserAndTypeUseCase =
  ProfileUseCases.FindProfileByUserAndType();
export const GetProfileByIdUseCase = ProfileUseCases.GetProfileById();
export const GetProfilesByTypeUseCase = ProfileUseCases.GetProfilesByType();
export const GetUserProfilesUseCase = ProfileUseCases.GetUserProfiles(
  userRepo,
  profileRepo
);
