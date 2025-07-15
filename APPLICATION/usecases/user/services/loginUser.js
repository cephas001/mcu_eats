import {
  ValidationError,
  UserExistenceError,
  ProfileExistenceError,
  UnexpectedError,
  InvalidTokenError,
} from "../../../domain/Error.js";

export default function loginUser(userRepo, loginService) {
  return async function (token) {
    if (!token) {
      throw new ValidationError("No token was sent", null);
    }

    try {
      var { id } = await loginService.verifyToken(token);
    } catch (error) {
      throw new InvalidTokenError("Error decoding token");
    }

    const existingUser = await userRepo.findById(id);

    if (!existingUser) {
      throw new UserExistenceError("User does not exists");
    }

    const userHasProfile = await userRepo.userHasProfile(existingUser);

    if (!userHasProfile) {
      throw new ProfileExistenceError("User has no profile");
    }

    try {
      const user = await userRepo.update(id, { lastLogin: Date.now() });

      if (user) {
        return user;
      }
      throw null;
    } catch (error) {
      throw UnexpectedError("Error while logging in user");
    }
  };
}
