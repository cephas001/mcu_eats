import {
  ValidationError,
  UserExistenceError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function CreateUserProfiles(profileRepo, userRepo) {
  return async function (userId, userProfiles) {
    if (!userProfiles) {
      throw new ValidationError("User profiles are not defined");
    }

    if (!Array.isArray(userProfiles) || userProfiles?.length === 0) {
      throw new ValidationError("User profiles must be a non-empty array");
    }

    const savedUser = await userRepo.findById(userId);

    if (!savedUser) {
      throw new UserExistenceError("This user is not saved in the database");
    }

    try {
      const profiles = await profileRepo.createUserProfiles(userProfiles);

      return profiles;
    } catch (error) {
      throw new UnexpectedError("An error occurred while storing profiles");
    }
  };
}
