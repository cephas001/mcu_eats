import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";
import createUser from "../../APPLICATION/usecases/user/repositories/createUser.js";
import updateUser from "../../APPLICATION/usecases/user/repositories/updateUser.js";
import getUser from "../../APPLICATION/usecases/user/repositories/getUser.js";

import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

const userRepo = new MongoUserRepository(User, Profile);

export const createUserUseCase = createUser(userRepo);
export const updateUserUseCase = updateUser(userRepo);
export const getUserUseCase = getUser(userRepo);
