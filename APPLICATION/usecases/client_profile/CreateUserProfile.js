import {
  ValidationError,
  UserExistenceError,
  ProfileExistenceError,
  LocalStorageError,
} from "../../domain/Error.js";

export default function CreateUserProfile(profileRepo, userRepo) {
  return async function (userId, profileData) {
    if (!profileData || !profileData?.type) {
      throw new ValidationError("The user's profile data is not defined. Note: Attach a type to the profile data object");
    }

    const storedUser = await userRepo.findById(
      userId
    );

    if (!storedUser) {
      throw new UserExistenceError("This user does not exists in the database");
    }

    // Checks if the profile is already stored
    const storedProfile = await profileRepo.getProfileByUserIdAndType(
      userId,
      profileData.type
    );

    if (storedProfile) {
      throw new ProfileExistenceError("This profile is already saved");
    }

    try {
      const { savedProfile, profileId } =
        await profileRepo.createUserProfile(profileData);

      const updatedUser = await userRepo.linkProfileToUser(userId, profileId, profileData.type);

      return { savedProfile, updatedUser };
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while creating user profile",
        error
      );
    }
  };
}
