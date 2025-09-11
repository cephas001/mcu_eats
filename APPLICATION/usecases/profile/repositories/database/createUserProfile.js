import Consumer from "../../../../domain/ConsumerProfile.js";
import DeliveryPerson from "../../../../domain/DeliveryPersonProfile.js";
import Vendor from "../../../../domain/VendorProfile.js";
import {
  createStudentConsumerProfileSchema,
  createStaffConsumerProfileSchema,
  createDeliveryPersonProfileSchema,
  createVendorProfileSchema,
  profileTypeSchema,
} from "../../../../validators/profile/validateProfileData.js";
import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
  ProfileExistenceError,
  UnauthorizedError,
} from "../../../../domain/Error.js";

function checkCategoryAndReturnSchema(userCategory) {
  if (userCategory == "staff") {
    return createStaffConsumerProfileSchema;
  } else {
    return createStudentConsumerProfileSchema;
  }
}
export default function createUserProfile(profileRepo, userRepo) {
  return async function (userProfileToCreate) {
    if (!userProfileToCreate) {
      throw new ValidationError("The user profile data is not defined", null);
    }

    const typeValidationResult = profileTypeSchema.safeParse(
      userProfileToCreate.type
    );

    if (!typeValidationResult.success) {
      throw new ValidationError(
        "The profile type is not properly defined",
        null
      );
    }

    // Check if user exists by ID
    const existingUser = await userRepo.findById(userProfileToCreate.userId);

    if (!existingUser) {
      throw new UserExistenceError("A user with this ID does not exist");
    }

    // Check if profile already exists
    // AMMEND EMBEDDED LOGIC
    const existingProfile = await profileRepo.getProfileByUserIdAndType(
      userProfileToCreate.userId,
      userProfileToCreate.type
    );

    if (existingProfile) {
      throw new ProfileExistenceError(
        "This profile already exists for this user"
      );
    }

    const unauthorizedAction =
      (existingUser.category === "staff" ||
        existingUser.category === "visitor") &&
      ["delivery_person", "vendor"].includes(userProfileToCreate.type);

    if (unauthorizedAction) {
      throw new UnauthorizedError(
        "Access denied: You are not authorized to create this profile."
      );
    }

    const schemaMap = {
      consumer: checkCategoryAndReturnSchema(existingUser.category),
      vendor: createVendorProfileSchema,
      delivery_person: createDeliveryPersonProfileSchema,
    };

    const schema = schemaMap[userProfileToCreate.type];

    const validationResult = schema.safeParse(userProfileToCreate);

    if (!validationResult.success) {
      const errorList = validationResult.error.errors.map((e) => ({
        inputName: e.path.join(".") || "unknown",
        errorMessage: e.message,
      }));

      throw new ValidationError("Validation failed", null, errorList);
    }

    const validatedData = validationResult.data;

    const domainMap = {
      consumer: Consumer,
      delivery_person: DeliveryPerson,
      vendor: Vendor,
    };

    try {
      const profile = new domainMap[userProfileToCreate.type](validatedData);
      var { savedProfile, profileId } = await profileRepo.createUserProfile(
        userProfileToCreate.type,
        profile
      );
    } catch (error) {
      throw new UnexpectedError("An error occurred while creating profile");
    }

    try {
      if (!profileId || !savedProfile?.type) {
        throw new UnexpectedError("An unexpected error occurred");
      }

      const updatedUser = await userRepo.linkProfileToUser(
        userProfileToCreate.userId,
        profileId,
        savedProfile.type
      );

      return { savedProfile, updatedUser };
    } catch (error) {
      throw new UnexpectedError("An unexpected error occurred");
    }
  };
}
