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
import { inputErrorHandler } from "../../utils/errorHandler.js";

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

    const profile = await consumerRepo.findById(profileId);

    if (!profile) {
      throw new ProfileExistenceError("This profile does not exists");
    }

    if (profile.userId !== userId) {
      throw new UnauthorizedError("This profile does not belong to this user");
    }

    const consumerSchema = checkCategoryAndReturnSchema(existingUser.category);

    const validatedConsumerData = inputErrorHandler(
      consumerSchema,
      consumerData
    );

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
