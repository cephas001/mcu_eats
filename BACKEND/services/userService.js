import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";
import createUser from "../../APPLICATION/usecases/user/repositories/createUser.js";

const userRepo = new MongoUserRepository();

export const createUserUseCase = createUser(userRepo);
