import {
  ValidationError,
  ProfileExistenceError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function retrieveUserSelectedProfile(browserProfileRepo) {
  return async function (userId) {
    const selectedProfile =
      await browserProfileRepo.retrieveUserSelectedProfile();

    if (!selectedProfile) {
      const userProfiles = await browserProfileRepo.retrieveUserProfiles();

      if (userProfiles) {
        throw new ProfileExistenceError(
          "User profiles are stored but no profile is selected"
        );
      } else {
        throw new LocalStorageError("There are no profiles stored");
      }
    }

    if (selectedProfile.userId !== userId) {
      throw new ValidationError(
        "The stored selected profile does not belong to the requesting user"
      );
    }

    return selectedProfile;
  };
}
