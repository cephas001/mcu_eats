import { createProfileSchema } from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  ProfileExistenceError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function retrieveUserSelectedProfile(browserProfileRepo) {
  return async function (userId) {
    const selectedProfile =
      await browserProfileRepo.retrieveUserSelectedProfile();

    if (!selectedProfile) {
      const userProfiles = await browserProfileRepo.retrieveUserProfiles();

      if (userProfiles) {
        throw new ProfileExistenceError(
          "User profiles are stored but no profile is selected"
        );
      } else {
        throw new LocalStorageError("There are no profiles stored");
      }
    }

    const validationResult = createProfileSchema.safeParse(selectedProfile);

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));
      throw new ValidationError(
        "The user profile data has been tampered with",
        null,
        errorList
      );
    }

    if (selectedProfile.userId !== userId) {
      throw new ValidationError(
        "The stored selected profile does not belong to the requesting user"
      );
    }

    const validatedData = validationResult.data;

    return validatedData;
  };
}
