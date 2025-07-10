import Profile from "../../domain/Profile.js";
import { createProfileSchema } from "../../validators/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function createProfile(profileRepo, userRepo) {
  return async function (profileData) {
    if (!profileData) {
      throw new ValidationError("Profile data is not defined", null);
    }

    if (!profileData.userId) {
      throw new ValidationError("User ID is not defined", "userId");
    }

    if (!profileData.type) {
      throw new ValidationError("Validation failed", null, errorList);
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

    // Check if user already exists by ID
    const existingUser = await profileRepo.findUserById(validatedData.userId);

    if (!existingUser) {
      throw new UserAlreadyExistsError(
        "A user with this ID does not exist",
        null
      );
    }

    // Check if profile already exists
    const existingProfile = await profileRepo.existsByUserIdAndType(
      validatedData.userId,
      profileData.type
    );

    if (existingProfile) {
      throw new UserExistenceError(
        "This profile already exists for this user",
        null
      );
    }

    // Create a new profile instance
    const profile = new Profile(validatedData);

    try {
      const { savedProfile, profileId } = await profileRepo.createProfile(
        profile
      );

      const updatedUser = await userRepo.linkProfile(
        profileData.userId,
        profileId
      );

      return { savedProfile, updatedUser };
    } catch (error) {
      throw new UnexpectedError("An unexpected error occurred");
    }
  };
}
