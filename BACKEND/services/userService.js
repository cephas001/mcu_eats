import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";

import createUser from "../../APPLICATION/usecases/user/repositories/database/createUser.js";
import updateUser from "../../APPLICATION/usecases/user/repositories/database/updateUser.js";
import getUser from "../../APPLICATION/usecases/user/repositories/database/getUser.js";

import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

const userRepo = new MongoUserRepository(User, Profile);

export const createUserUseCase = createUser(userRepo);
export const updateUserUseCase = updateUser(userRepo);
export const getUserUseCase = getUser(userRepo);
