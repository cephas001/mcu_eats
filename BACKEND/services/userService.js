import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";
import createUser from "../../APPLICATION/usecases/user/repositories/createUser.js";

import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";

const userRepo = new MongoUserRepository(User, Profile);

export const createUserUseCase = createUser(userRepo);
