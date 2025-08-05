import { LocalStorageError } from "../../../../domain/Error.js";

export default function clearUser(browserUserRepo) {
  return async function () {
    try {
      await browserUserRepo.clearUser();
    } catch (error) {
      throw new LocalStorageError(
        "An error occurred while trying to clear user data"
      );
    }
  };
}
