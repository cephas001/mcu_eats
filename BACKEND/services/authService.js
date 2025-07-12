import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";
import FirebaseAuthService from "../infrastructure/services/FirebaseAuthService.js";
import loginUser from "../../APPLICATION/usecases/user/services/loginUser.js";
import verifyToken from "../../APPLICATION/usecases/user/services/verifyToken.js";
import deleteUserAuth from "../../APPLICATION/usecases/user/services/deleteUserAuth.js";
import getUserByEmail from "../../APPLICATION/usecases/user/services/getUserByEmail.js";

import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

import admin from "../firebaseConnection.js";

const userRepo = new MongoUserRepository(User, Profile);
const authService = new FirebaseAuthService(admin);

export const createLoginUserUseCase = loginUser(userRepo, authService);
export const createVerifyTokenUseCase = verifyToken(authService);
export const createDeleteUserAuthUseCase = deleteUserAuth(authService);
export const createGetUserByEmailUseCase = getUserByEmail(authService);
