import { LocalStorageError } from "../../../../domain/Error.js";

export default function (localUserRepo) {
  return async function () {
    try {
      await localUserRepo.clearUser();
    } catch (error) {
      throw new LocalStorageError(
        "An error occurred while trying to clear user data"
      );
    }
  };
}
