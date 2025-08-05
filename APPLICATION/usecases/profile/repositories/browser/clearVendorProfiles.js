import { LocalStorageError } from "../../../../domain/Error.js";

export default function clearVendorProfiles(browserProfileRepo) {
  return async function () {
    try {
      await browserProfileRepo.clearVendorProfiles();
    } catch (error) {
      throw new LocalStorageError(
        "An error occurred while trying to clear profiles data"
      );
    }
  };
}
