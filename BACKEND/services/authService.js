import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";
import FirebaseAuthService from "../infrastructure/services/FirebaseAuthService.js";

import loginUser from "../../APPLICATION/usecases/user/services/loginUser.js";
import verifyToken from "../../APPLICATION/usecases/user/services/verifyToken.js";
import getEmailVerificationLink from "../../APPLICATION/usecases/user/services/getEmailVerificationLink.js";
import deleteUserAuth from "../../APPLICATION/usecases/user/services/deleteUserAuth.js";
import getUserByEmail from "../../APPLICATION/usecases/user/services/getUserByEmail.js";

import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

import admin from "../firebaseConnection.js";

const userRepo = new MongoUserRepository(User, Profile);
const authService = new FirebaseAuthService(admin);

export const loginUserUseCase = loginUser(userRepo, authService);
export const verifyTokenUseCase = verifyToken(authService);
export const deleteUserAuthUseCase = deleteUserAuth(authService);
export const getUserByEmailUseCase = getUserByEmail(authService);
export const getEmailVerificationLinkUseCase =
  getEmailVerificationLink(authService);
