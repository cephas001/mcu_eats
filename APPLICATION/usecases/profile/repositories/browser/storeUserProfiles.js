import {
  ValidationError,
  UserExistenceError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function storeUserProfiles(browserProfileRepo, browserUserRepo) {
  return async function (userProfiles) {
    if (!userProfiles) {
      throw new ValidationError("User profiles are not defined", null);
    }

    if (!Array.isArray(userProfiles) || userProfiles?.length === 0) {
      throw new ValidationError(
        "User profiles must be a non-empty array",
        null
      );
    }

    for (const userProfile of userProfiles) {
      if (!userProfile.userId) {
        throw new ValidationError(
          "User ID is not defined in profiles data",
          null
        );
      }

      const savedUser = await browserUserRepo.retrieveUserById(
        userProfile.userId
      );

      if (!savedUser) {
        throw new UserExistenceError("This user is not already saved");
      }
    }

    try {
      await browserProfileRepo.clearUserProfiles();

      const profiles = await browserProfileRepo.storeUserProfiles(userProfiles);

      return profiles;
    } catch (error) {
      throw new LocalStorageError("An error occurred while storing profiles");
    }
  };
}
