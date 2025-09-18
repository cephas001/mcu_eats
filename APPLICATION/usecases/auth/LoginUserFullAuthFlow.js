import {
  UserExistenceError,
  ProfileExistenceError,
  TokenExistenceError,
  UnexpectedError,
  InvalidTokenError,
} from "../../domain/Error.js";

export default function LoginUserFullAuthFlow(authService, userRepo) {
  return async function (token) {
    if (!token) {
      throw new TokenExistenceError("No token was sent");
    }

    let userId;
    try {
      const { id } = await authService.verifyToken(token);
      userId = id;
    } catch (error) {
      throw new InvalidTokenError("Error decoding token");
    }

    let user;
    try {
      user = await userRepo.findById(userId);
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to fetch the user's details",
        error
      );
    }

    if (!user) {
      throw new UserExistenceError(
        "This user is authenticated but is not stored in the database"
      );
    }

    let isProfileAssigned;
    try {
      isProfileAssigned = await userRepo.hasUserProfile(userId);
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while checking if the user has a profile",
        error
      );
    }

    if (!isProfileAssigned) {
      throw new ProfileExistenceError("This user has no profile");
    }

    try {
      user = await userRepo.updateUser(userId, { lastLogin: new Date() });

      return user;
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while updating the user's last login details",
        error
      );
    }
  };
}
