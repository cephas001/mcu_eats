import { createProfileSchema } from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  ProfileExistenceError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function addProfileToStoredUserProfiles(
  browserProfileRepo,
  browserUserRepo
) {
  return async function (userProfile) {
    if (!userProfile) {
      throw new ValidationError("The user's profile is not defined", null);
    }

    if (!userProfile.userId) {
      throw new ValidationError("The user's ID is not defined", "userId");
    }

    if (!userProfile.type) {
      throw new ValidationError(
        "The profile type is not defined",
        null,
        errorList
      );
    }

    // Check if user exists by ID
    const existingUser = await browserUserRepo.retrieveUserById(
      userProfile.userId
    );

    if (!existingUser) {
      throw new UserExistenceError("The user is not already saved");
    }

    // Checks if the profile is already stored
    const existingProfile = await browserProfileRepo.checkForStoredUserProfile(
      userProfile.userId,
      userProfile.type
    );

    if (existingProfile) {
      throw new ProfileExistenceError("This profile is already saved");
    }

    const validationResult = createProfileSchema.safeParse(userProfile);

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

    const validatedData = validationResult.data;

    try {
      const { savedProfile, profileId } =
        await browserProfileRepo.addProfileToStoredUserProfiles(validatedData);

      const updatedUser = await browserUserRepo.updateUser(existingUser.id, {
        profiles: [
          ...existingUser.profiles,
          { profileId, type: savedProfile.type },
        ],
      });

      return { savedProfile, updatedUser };
    } catch (error) {
      throw new LocalStorageError("An error occurred while storing profile");
    }
  };
}
