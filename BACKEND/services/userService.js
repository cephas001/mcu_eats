import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";

// NEW
import * as UserUseCases from "../../APPLICATION/usecases/user/index.js";

import User from "../models/userModel.js";
import ConsumerProfile from "../models/consumerProfileModel.js";
import DeliveryPersonProfile from "../models/deliveryPersonProfileModel.js";
import VendorProfile from "../models/vendorProfileModel.js";

const userRepo = new MongoUserRepository(
  User,
  ConsumerProfile,
  DeliveryPersonProfile,
  VendorProfile
);

export const CreateUserUseCase = UserUseCases.CreateUser(userRepo);
export const UpdateUserUseCase = UserUseCases.UpdateUser(userRepo);
export const GetUserByIdUseCase = UserUseCases.GetUserById(userRepo);
export const BanUserUseCase = UserUseCases.BanUser();
export const DeactivateUserUseCase = UserUseCases.DeactivateUser();
export const ListUsersByRoleUseCase = UserUseCases.ListUsersByRole();
export const ReactivateUserUseCase = UserUseCases.ReactivateUser();
export const SearchUsersUseCase = UserUseCases.SearchUsers();
export const DeleteUserUseCase = UserUseCases.DeleteUser();
export const UnbanUserUseCase = UserUseCases.UnbanUser();
