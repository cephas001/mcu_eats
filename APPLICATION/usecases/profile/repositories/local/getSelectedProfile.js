import { createProfileSchema } from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  ProfileExistenceError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function getSelectedProfile(localProfileRepo) {
  return async function () {
    const profileData = await localProfileRepo.getSelectedProfile();

    if (!profileData) {
      const profilesData = await localProfileRepo.getProfiles();

      if (profilesData) {
        throw new ProfileExistenceError(
          "Profiles exist but no profile is selected"
        );
      } else {
        throw new LocalStorageError("No profiles found in local storage");
      }
    }

    const validationResult = createProfileSchema.safeParse(profileData);

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));
      throw new ValidationError(
        "Profile data has been tampered with",
        null,
        errorList
      );
    }

    const validatedData = validationResult.data;

    return validatedData;
  };
}
