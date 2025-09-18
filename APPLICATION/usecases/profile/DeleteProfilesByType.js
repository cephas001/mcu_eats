import { UnexpectedError } from "../../domain/Error.js";

export default function DeleteProfilesByType(profileRepo) {
  return async function (profileType) {
    try {
      await profileRepo.deleteProfilesByType(profileType);
    } catch (error) {
      throw new UnexpectedError(
        `An unexpected error occurred while deleting ${profileType} profiles data`,
        error
      );
    }
  };
}
