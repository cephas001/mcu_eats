import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";

import * as UserUseCases from "../../APPLICATION/usecases/user/index.js";

import * as Models from "../models/index.js";

const userRepo = new MongoUserRepository(
  Models.User,
  Models.ConsumerProfile,
  Models.DeliveryPersonProfile,
  Models.VendorProfile
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
