import MongoProfileRepository from "../infrastructure/repositories/MongoProfileRepository.js";
import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";
import createProfile from "../../APPLICATION/usecases/profile/createProfile.js";

const profileRepo = new MongoProfileRepository();
const userRepo = new MongoUserRepository();

export const createProfileUseCase = createProfile(profileRepo, userRepo);
