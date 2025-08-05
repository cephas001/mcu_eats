import { createProfileSchema } from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  LocalStorageError,
  ProfileExistenceError,
} from "../../../../domain/Error.js";

export default function retrieveUserProfiles(browserProfileRepo) {
  return async function (userId) {
    try {
      var userProfiles = await browserProfileRepo.retrieveUserProfiles(userId);
    } catch (error) {
      throw new LocalStorageError(
        "An error occurred while trying to get the user's profiles"
      );
    }

    if (!userProfiles) {
      throw new ProfileExistenceError("User's profiles are not stored locally");
    }

    for (const userProfile of userProfiles) {
      const validationResult = createProfileSchema.safeParse(userProfile);

      if (!validationResult.success) {
        const errorList = validationResult.error.errors.map((e) => ({
          inputName: e.path.join(".") || "unknown",
          errorMessage: e.message,
        }));

        throw new ValidationError(
          "The user's profiles data has been tampered with",
          null,
          errorList
        );
      }

      if (userProfile.userId !== userId) {
        throw new ValidationError(
          "The profiles stored do not belong to the requesting user"
        );
      }
    }

    return userProfiles;
  };
}
