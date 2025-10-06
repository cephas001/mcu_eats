import { updateVendorProfileSchema } from "../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  ProfileExistenceError,
  UnauthorizedError,
  UnexpectedError,
} from "../../domain/Error.js";
import { inputErrorHandler } from "../../utils/errorHandler.js";

export default function UpdateVendor(userRepo, vendorRepo) {
  return async function ({ userId, profileId, vendorData }) {
    const existingUser = await userRepo.findById(userId);

    if (!existingUser) {
      throw new UserExistenceError("This user does not exists");
    }

    const profile = await vendorRepo.getVendorById(profileId);

    if (!profile) {
      throw new ProfileExistenceError("This profile does not exists");
    }

    if (profile.userId !== userId) {
      throw new UnauthorizedError("This profile does not belong to this user");
    }

    const validatedVendorData = inputErrorHandler(
      updateVendorProfileSchema,
      vendorData
    );

    try {
      return await vendorRepo.updateVendor(profileId, validatedVendorData);
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while updating the vendor profile",
        error
      );
    }
  };
}
