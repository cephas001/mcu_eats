import { updateVendorProfileSchema } from "../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  ProfileExistenceError,
  UnauthorizedError,
  UnexpectedError,
} from "../../domain/Error.js";

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

    const vendorDataValidation =
      updateVendorProfileSchema.safeParse(vendorData);

    if (!vendorDataValidation.success) {
      const errorList = vendorDataValidation.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    const validatedVendorData = vendorDataValidation.data;

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
