import {
  updateStudentConsumerProfile,
  updateStaffConsumerProfile,
} from "../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  ProfileExistenceError,
  UnauthorizedError,
  UnexpectedError,
} from "../../domain/Error.js";

function checkCategoryAndReturnSchema(userCategory) {
  if (userCategory == "staff") {
    return updateStaffConsumerProfile;
  } else {
    return updateStudentConsumerProfile;
  }
}

export default function UpdateConsumer(userRepo, consumerRepo) {
  return async function ({ userId, profileId, consumerData }) {
    const existingUser = await userRepo.findById(userId);

    if (!existingUser) {
      throw new UserExistenceError("This user does not exists");
    }

    const profile = await consumerRepo.getConsumerById(profileId);

    if (!profile) {
      throw new ProfileExistenceError("This profile does not exists");
    }

    if (profile.userId !== userId) {
      throw new UnauthorizedError("This profile does not belong to this user");
    }

    const consumerSchema = checkCategoryAndReturnSchema(existingUser.category);

    const consumerDataValidation = consumerSchema.safeParse(consumerData);

    if (!consumerDataValidation.success) {
      const errorList = consumerDataValidation.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    const validatedConsumerData = consumerDataValidation.data;

    try {
      return await consumerRepo.updateConsumer(
        profileId,
        validatedConsumerData
      );
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while updating the consumer profile",
        error
      );
    }
  };
}
