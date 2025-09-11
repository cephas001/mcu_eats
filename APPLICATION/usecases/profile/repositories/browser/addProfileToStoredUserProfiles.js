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

    // Check if user exists in storage
    const existingUser = await browserUserRepo.retrieveUserById(
      userProfile.userId
    );

    if (!existingUser) {
      throw new UserExistenceError("This user is not stored");
    }

    // Checks if the profile is already stored
    const existingProfile = await browserProfileRepo.checkForStoredUserProfile(
      userProfile.userId,
      userProfile.type
    );

    if (existingProfile) {
      throw new ProfileExistenceError("This profile is already saved");
    }

    try {
      const { savedProfile, profileId } =
        await browserProfileRepo.addProfileToStoredUserProfiles(userProfile);

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
