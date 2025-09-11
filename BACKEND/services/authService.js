import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";
import FirebaseAuthService from "../infrastructure/services/FirebaseAuthService.js";

import loginUserFullAuthFlow from "../../APPLICATION/usecases/user/services/loginUserFullAuthFlow.js";
import verifyToken from "../../APPLICATION/usecases/user/services/verifyToken.js";
import getEmailVerificationLink from "../../APPLICATION/usecases/user/services/getEmailVerificationLink.js";
import deleteUserAuth from "../../APPLICATION/usecases/user/services/deleteUserAuth.js";
import getUserByEmail from "../../APPLICATION/usecases/user/services/getUserByEmail.js";

import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";
import ConsumerProfile from "../models/consumerProfileModel.js";
import DeliveryPersonProfile from "../models/deliveryPersonProfileModel.js";
import VendorProfile from "../models/vendorProfileModel.js";

import admin from "../firebaseConnection.js";

const userRepo = new MongoUserRepository(
  User,
  Profile,
  ConsumerProfile,
  DeliveryPersonProfile,
  VendorProfile
);
const authService = new FirebaseAuthService(admin);

export const loginUserFullAuthFlowUseCase = loginUserFullAuthFlow(
  userRepo,
  authService
);
export const verifyTokenUseCase = verifyToken(authService);
export const deleteUserAuthUseCase = deleteUserAuth(authService);
export const getUserByEmailUseCase = getUserByEmail(authService);
export const getEmailVerificationLinkUseCase =
  getEmailVerificationLink(authService);
