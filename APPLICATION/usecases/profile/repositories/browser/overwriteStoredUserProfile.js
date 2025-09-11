import {
  ValidationError,
  UserExistenceError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function overwriteStoredUserProfile(
  browserUserRepo,
  browserProfileRepo
) {
  return async function (profileId, newProfileValue) {
    if (!profileId || !newProfileValue) {
      throw new ValidationError("Inputs are not properly defined", null);
    }

    if (!newProfileValue.userId) {
      throw new ValidationError("User ID is not defined in profile data", null);
    }

    const savedUser = await browserUserRepo.retrieveUserById(
      newProfileValue.userId
    );

    if (!savedUser) {
      throw new UserExistenceError("This user is not already saved");
    }

    try {
      return await browserProfileRepo.overwriteStoredUserProfile(
        profileId,
        newProfileValue
      );
    } catch (error) {
      throw new LocalStorageError(
        "An error occurred while updating the profile"
      );
    }
  };
}
