import Profile from "../../domain/Profile.js";
import { createProfileSchema } from "../../validators/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
  ProfileExistenceError,
  UnauthorizedError,
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
      throw new ValidationError("Profile type is not defined", null, errorList);
    }

    // Check if user exists by ID
    const existingUser = await userRepo.findById(profileData.userId);

    if (!existingUser) {
      throw new UserExistenceError("A user with this ID does not exist");
    }

    // Check if profile already exists
    const existingProfile = await profileRepo.existsByUserIdAndType(
      profileData.userId,
      profileData.type
    );

    if (existingProfile) {
      throw new ProfileExistenceError(
        "This profile already exists for this user"
      );
    }

    const isStaffDelivery =
      existingUser.category === "staff" &&
      profileData.type === "delivery_person";

    const isVisitorRestricted =
      existingUser.category === "visitor" &&
      ["delivery_person", "vendor"].includes(profileData.type);

    if (isStaffDelivery || isVisitorRestricted) {
      throw new UnauthorizedError(
        "Access denied: You are not authorized to create this profile."
      );
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
