import Profile from "../../../../domain/Profile.js";
import { createProfileSchema } from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  ProfileExistenceError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function addProfile(localProfileRepo, localUserRepo) {
  return async function (profileData) {
    if (!profileData) {
      throw new ValidationError("Profile data is not defined", null);
    }

    if (!profileData.userId) {
      throw new ValidationError("User ID is not defined", "userId");
    }

    if (!profileData.type) {
      throw new ValidationError("Profile type is not defined", null, errorList);
    }

    // Check if user exists by ID
    const existingUser = await localUserRepo.getUser(profileData.userId);

    if (!existingUser) {
      throw new UserExistenceError("A user is not already saved");
    }

    // Check if profile already exists
    const existingProfile = await localProfileRepo.existsByUserIdAndType(
      profileData.userId,
      profileData.type
    );

    if (existingProfile) {
      throw new ProfileExistenceError("This profile is already saved");
    }

    const validationResult = createProfileSchema.safeParse(profileData);

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));
      throw new ValidationError("Validation failed", null, errorList);
    }

    const validatedData = validationResult.data;

    // Create a new profile instance
    const profile = new Profile(validatedData);

    try {
      const { savedProfile, profileId } = await localProfileRepo.addProfile(
        profile
      );

      const updatedUser = await localUserRepo.updateUser(existingUser.id, {
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
