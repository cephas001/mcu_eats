import {
  ValidationError,
  UserExistenceError,
  LocalStorageError,
  UnexpectedError
} from "../../domain/Error.js";

export default function UpdateProfile(
  userRepo,
  profileRepo
) {
  return async function (profileId, newProfileValue) {
    if (!profileId || !newProfileValue) {
      throw new ValidationError("The profile id or profile data is not properly defined");
    }

    try {
      return await profileRepo.updateProfile(
        profileId,
        newProfileValue
      );
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while updating the user profile", error
      );
    }
  };
}
