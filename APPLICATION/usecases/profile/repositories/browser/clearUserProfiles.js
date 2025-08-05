import { LocalStorageError } from "../../../../domain/Error.js";

export default function clearUserProfiles(browserProfileRepo) {
  return async function () {
    try {
      await browserProfileRepo.clearUserSelectedProfile();
      await browserProfileRepo.clearUserProfiles();
    } catch (error) {
      throw new LocalStorageError(
        "An error occurred while trying to clear profiles data"
      );
    }
  };
}
