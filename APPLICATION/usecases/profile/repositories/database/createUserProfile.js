import Profile from "../../../../domain/Profile.js";
import { createProfileSchema } from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
  ProfileExistenceError,
  UnauthorizedError,
} from "../../../../domain/Error.js";

export default function createUserProfile(profileRepo, userRepo) {
  return async function (userProfile) {
    if (!userProfile) {
      throw new ValidationError("The user profile data is not defined", null);
    }

    if (!userProfile.userId) {
      throw new ValidationError("The user's ID is not defined", "userId");
    }

    if (!userProfile.type) {
      throw new ValidationError("The profile type is not defined", null);
    }

    // Check if user exists by ID
    const existingUser = await userRepo.findById(userProfile.userId);

    if (!existingUser) {
      throw new UserExistenceError("A user with this ID does not exist");
    }

    // Check if profile already exists
    const existingProfile = await profileRepo.getProfileByUserIdAndType(
      userProfile.userId,
      userProfile.type
    );

    if (existingProfile) {
      throw new ProfileExistenceError(
        "This profile already exists for this user"
      );
    }

    const unauthorizedAction =
      (existingUser.category === "staff" ||
        existingUser.category === "visitor") &&
      ["delivery_person", "vendor"].includes(userProfile.type);

    if (unauthorizedAction) {
      throw new UnauthorizedError(
        "Access denied: You are not authorized to create this profile."
      );
    }

    const validationResult = createProfileSchema.safeParse(userProfile);

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
      const { savedProfile, profileId } = await profileRepo.createUserProfile(
        profile
      );

      const updatedUser = await userRepo.linkProfileToUser(
        userProfile.userId,
        profileId
      );

      return { savedProfile, updatedUser };
    } catch (error) {
      throw new UnexpectedError("An unexpected error occurred");
    }
  };
}
