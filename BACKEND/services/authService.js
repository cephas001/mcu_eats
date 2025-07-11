import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";
import FirebaseAuthService from "../infrastructure/services/FirebaseAuthService.js";
import loginUser from "../../APPLICATION/usecases/user/services/loginUser.js";
import verifyToken from "../../APPLICATION/usecases/user/services/verifyToken.js";
import deleteUserAuth from "../../APPLICATION/usecases/user/services/deleteUserAuth.js";
import getUserByEmail from "../../APPLICATION/usecases/user/services/getUserByEmail.js";

const userRepo = new MongoUserRepository();
const authService = new FirebaseAuthService();

export const createLoginUserUseCase = loginUser(userRepo, authService);
export const createVerifyTokenUseCase = verifyToken(authService);
export const createDeleteUserAuthUseCase = deleteUserAuth(authService);
export const createGetUserByEmailUseCase = getUserByEmail(authService);
