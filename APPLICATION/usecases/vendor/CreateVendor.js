import Vendor from "../../domain/Vendor.js";
import { createVendorProfileSchema } from "../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
  ProfileExistenceError,
} from "../../domain/Error.js";
import { inputErrorHandler } from "../../utils/errorHandler.js";

export default function CreateVendor({ userRepo, vendorRepo }) {
  return async function (vendorProfileData, userId) {
    if (!vendorProfileData) {
      throw new ValidationError("The vendor profile data is not defined");
    }

    // Check if user exists by ID
    const existingUser = await userRepo.findById(userId);

    if (!existingUser) {
      throw new UserExistenceError("A user with this ID does not exist");
    }

    // Check if profile already exists
    const existingProfile = await userRepo.getProfileByUserIdAndType(
      userId,
      "vendor"
    );
    if (existingProfile) {
      throw new ProfileExistenceError(
        "This profile already exists for this user"
      );
    }

    const validatedVendorData = inputErrorHandler(createVendorProfileSchema, {
      userId,
      ...vendorProfileData,
      type: "vendor",
    });

    let createdProfile = null;
    let createdProfileId = null;
    try {
      const vendorProfile = new Vendor(validatedVendorData);
      const { savedProfile, profileId } = await vendorRepo.createVendor(
        vendorProfile
      );

      createdProfile = savedProfile;
      createdProfileId = profileId;
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while creating the vendor profile",
        error
      );
    }

    try {
      if (!createdProfileId || !createdProfile?.type) {
        throw new UnexpectedError(
          "An unexpected error occurred while creating the vendor profile"
        );
      }

      const updatedUser = await userRepo.linkProfileToUser(
        userId,
        createdProfileId,
        "vendor"
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
