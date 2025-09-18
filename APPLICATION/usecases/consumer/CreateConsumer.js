import Consumer from "../../domain/Consumer.js";
import {
  createStudentConsumerProfileSchema,
  createStaffConsumerProfileSchema,
} from "../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
  ProfileExistenceError,
} from "../../domain/Error.js";

function checkCategoryAndReturnSchema(userCategory) {
  if (userCategory == "staff") {
    return createStaffConsumerProfileSchema;
  } else if (userCategory == "student") {
    return createStudentConsumerProfileSchema;
  } else {
    return null;
  }
}

export default function CreateConsumer(consumerRepo, userRepo) {
  return async function (consumerProfileData, userId) {
    if (!consumerProfileData) {
      throw new ValidationError("The consumer profile data is not defined");
    }

    // Check if user exists by ID
    const existingUser = await userRepo.findById(userId);

    if (!existingUser) {
      throw new UserExistenceError("A user with this ID does not exist");
    }

    // Check if profile already exists
    const existingProfile = await userRepo.getProfileByUserIdAndType(
      userId,
      "consumer"
    );

    if (existingProfile) {
      throw new ProfileExistenceError(
        "This profile already exists for this user"
      );
    }

    const consumerSchema = checkCategoryAndReturnSchema(existingUser.category);

    if (!consumerSchema) {
      throw new ValidationError("Invalid user category sent");
    }

    const consumerDataValidation =
      consumerSchema.safeParse(consumerProfileData);

    if (!consumerDataValidation.success) {
      const errorList = consumerDataValidation.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    const validatedConsumerData = consumerDataValidation.data;

    let createdProfile = null;
    let createdProfileId = null;
    try {
      const consumerProfile = new Consumer(validatedConsumerData);
      const { savedProfile, profileId } = await consumerRepo.createConsumer(
        consumerProfile
      );

      createdProfile = savedProfile;
      createdProfileId = profileId;
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while creating the consumer profile",
        error
      );
    }

    try {
      if (!createdProfileId || !createdProfile?.type) {
        throw new UnexpectedError(
          "An unexpected error occurred while creating the consumer profile"
        );
      }

      const updatedUser = await userRepo.linkProfileToUser(
        userId,
        createdProfileId,
        "consumer"
      );

      return { savedProfile: createdProfile, updatedUser };
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while linking the profile to the user data in database",
        error
      );
    }
  };
}
