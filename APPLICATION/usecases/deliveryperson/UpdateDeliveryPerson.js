import { updateDeliveryPersonProfileSchema } from "../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  ProfileExistenceError,
  UnauthorizedError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function UpdateDeliveryPerson(userRepo, deliveryPersonRepo) {
  return async function ({ userId, profileId, deliveryPersonData }) {
    const existingUser = await userRepo.findById(userId);

    if (!existingUser) {
      throw new UserExistenceError("This user does not exists");
    }

    const profile = await deliveryPersonRepo.getDeliveryPersonById(profileId);

    if (!profile) {
      throw new ProfileExistenceError("This profile does not exists");
    }

    if (profile.userId !== userId) {
      throw new UnauthorizedError("This profile does not belong to this user");
    }

    const deliveryPersonDataValidation =
      updateDeliveryPersonProfileSchema.safeParse(deliveryPersonData);

    if (!deliveryPersonDataValidation.success) {
      const errorList = deliveryPersonDataValidation.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    const validatedDeliveryPersonData = deliveryPersonDataValidation.data;

    try {
      return await deliveryPersonRepo.updateDeliveryPerson(
        profileId,
        validatedDeliveryPersonData
      );
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while updating the delivery person profile",
        error
      );
    }
  };
}
