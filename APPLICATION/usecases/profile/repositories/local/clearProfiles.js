import { LocalStorageError } from "../../../../domain/Error.js";

export default function (localProfileRepo) {
  return async function () {
    try {
      await localProfileRepo.clearProfiles();
      await localProfileRepo.clearSelectedProfile();
    } catch (error) {
      throw new LocalStorageError(
        "An error occurred while trying to clear profiles data"
      );
    }
  };
}
