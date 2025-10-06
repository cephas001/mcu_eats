import DeliveryPerson from "../../domain/DeliveryPerson.js";
import { createDeliveryPersonProfileSchema } from "../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
  ProfileExistenceError,
} from "../../domain/Error.js";
import { inputErrorHandler } from "../../utils/errorHandler.js";

export default function CreateDeliveryPerson(deliveryPersonRepo, userRepo) {
  return async function (deliveryPersonProfileData, userId) {
    if (!deliveryPersonProfileData) {
      throw new ValidationError(
        "The delivery person profile data is not defined"
      );
    }

    // Check if user exists by ID
    const existingUser = await userRepo.findById(userId);

    if (!existingUser) {
      throw new UserExistenceError("A user with this ID does not exist");
    }

    // Check if profile already exists
    const existingProfile = await userRepo.getProfileByUserIdAndType(
      userId,
      "delivery_person"
    );

    if (existingProfile) {
      throw new ProfileExistenceError(
        "This profile already exists for this user"
      );
    }

    const validatedDeliveryPersonData = inputErrorHandler(
      createDeliveryPersonProfileSchema,
      deliveryPersonProfileData
    );

    let createdProfile = null;
    let createdProfileId = null;
    try {
      const deliveryPersonProfile = new DeliveryPerson(
        validatedDeliveryPersonData
      );
      const { savedProfile, profileId } =
        await deliveryPersonRepo.createDeliveryPerson(deliveryPersonProfile);

      createdProfile = savedProfile;
      createdProfileId = profileId;
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while creating the delivery person profile",
        error
      );
    }

    try {
      if (!createdProfileId || !createdProfile?.type) {
        throw new UnexpectedError(
          "An unexpected error occurred while creating the delivery person profile"
        );
      }

      const updatedUser = await userRepo.linkProfileToUser(
        userId,
        createdProfileId,
        "delivery_person"
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
