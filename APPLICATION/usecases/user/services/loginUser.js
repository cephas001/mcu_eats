import {
  ValidationError,
  UserExistenceError,
  ProfileExistenceError,
} from "../../../domain/Error.js";

export default function loginUser(userRepo, loginService) {
  return async function (token) {
    if (!token) {
      throw new ValidationError("No token was sent", null);
    }

    const { id } = await loginService.verifyToken(token);

    const existingUser = await userRepo.findById(id);

    if (!existingUser) {
      throw new UserExistenceError("User does not exists");
    }

    const userHasProfile = await userRepo.userHasProfile(existingUser);

    if (!userHasProfile) {
      throw new ProfileExistenceError("User has no profile");
    }

    return existingUser;
  };
}
