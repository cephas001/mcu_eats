import {
  ValidationError,
  UserExistenceError,
  ProfileExistenceError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function storeUserProfile(browserProfileRepo, browserUserRepo) {
  return async function (incomingProfile) {
    if (!incomingProfile) {
      throw new ValidationError("The user's profile is not defined");
    }

    // Check if user exists in storage
    const storedUser = await browserUserRepo.retrieveUserById(
      incomingProfile.userId
    );

    if (!storedUser) {
      throw new UserExistenceError("This user is not stored");
    }

    // Checks if the incomingProfile is already stored
    const matchingProfile = await browserProfileRepo.checkForStoredUserProfile(
      incomingProfile.userId,
      incomingProfile.type
    );

    if (matchingProfile) {
      throw new ProfileExistenceError("This incomingProfile is already saved");
    }

    try {
      const { savedProfile, incomingProfileId } =
        await browserProfileRepo.storeUserProfile(incomingProfile);

      const updatedUser = await browserUserRepo.updateUser(storedUser.id, {
        incomingProfiles: [
          ...(storedUser.incomingProfiles || []),
          { incomingProfileId, type: incomingProfile.type },
        ],
      });

      return { savedProfile, updatedUser };
    } catch (error) {
      throw new LocalStorageError(
        "An error occurred while storing incomingProfile",
        error
      );
    }
  };
}
