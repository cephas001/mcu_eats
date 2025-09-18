import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";
import FirebaseAuthService from "../infrastructure/services/FirebaseAuthService.js";

import * as AuthUseCases from "../../APPLICATION/usecases/auth/index.js";

import * as Models from "../models/index.js";

import admin from "../firebaseConnection.js";

const userRepo = new MongoUserRepository(
  Models.User,
  Models.ConsumerProfile,
  Models.DeliveryPersonProfile,
  Models.VendorProfile
);
const authService = new FirebaseAuthService(admin);

export const LoginUserFullAuthFlowUseCase = AuthUseCases.LoginUserFullAuthFlow(
  authService,
  userRepo
);
export const VerifyTokenUseCase = AuthUseCases.VerifyToken(authService);
export const GetUserByEmailUseCase = AuthUseCases.GetUserByEmail(authService);
export const ConfirmEmailUseCase = AuthUseCases.ConfirmEmail(
  authService,
  authService
);
export const ChangePasswordUseCase = AuthUseCases.ChangePassword();
export const RefreshTokenUseCase = AuthUseCases.RefreshToken();
export const ResendConfirmationEmailUseCase =
  AuthUseCases.ResendConfirmationEmail();
export const ResetPasswordUseCase = AuthUseCases.ResetPassword();
export const SendPasswordResetLinkUseCase =
  AuthUseCases.SendPasswordResetLink();
