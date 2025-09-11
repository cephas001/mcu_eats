import {
  updateStudentConsumerProfile,
  updateStaffConsumerProfile,
  updateDeliveryPersonProfileSchema,
  updateVendorProfileSchema,
  profileTypeSchema,
} from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  ProfileExistenceError,
  UnauthorizedError,
  UnexpectedError,
} from "../../../../domain/Error.js";

function checkCategoryAndReturnSchema(userCategory) {
  if (userCategory == "staff") {
    return updateStaffConsumerProfile;
  } else {
    return updateStudentConsumerProfile;
  }
}
export default function updateUserProfile(userRepo, profileRepo) {
  return async function ({
    userId,
    profileType,
    profileId,
    dataToUpdateUserProfileWith,
  }) {
    const profile = await profileRepo.getProfileByUserIdAndType(
      userId,
      profileType
    );

    if (!profile) {
      throw new ProfileExistenceError("This profile does not exists");
    }

    if (profile.userId !== userId || profile.type !== profileType) {
      throw new UnauthorizedError(
        "This profile does not belong to the user or type mismatch"
      );
    }

    const result = profileTypeSchema.safeParse(profileType);

    if (!result.success) {
      throw new ValidationError(
        "Profile type must be one of these: vendor, delivery_person, consumer"
      );
    }

    // Check if user does not exist
    const existingUser = await userRepo.findById(userId);

    if (!existingUser) {
      throw new UserExistenceError("This user does not exists");
    }

    const schemaMap = {
      consumer: checkCategoryAndReturnSchema(existingUser.category),
      vendor: updateVendorProfileSchema,
      delivery_person: updateDeliveryPersonProfileSchema,
    };

    const schema = schemaMap[profileType];

    const validationResult = schema.safeParse(dataToUpdateUserProfileWith);

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    const validatedData = validationResult.data;

    try {
      console.log(validatedData);
      return await profileRepo.updateUserProfile(
        profileId,
        profileType,
        validatedData
      );
    } catch (error) {
      console.log(error);
      throw new UnexpectedError("An unexpected error occurred");
    }
  };
}
