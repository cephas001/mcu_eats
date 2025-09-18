import {
  ValidationError,
  ProfileExistenceError,
  ProfileSelectionError,
  LocalStorageError,
} from "../../domain/Error.js";

export default function GetSelectedProfile(profileRepo) {
  return async function (userId) {
    const selectedProfile =
      await profileRepo.getSelectedProfile(userId);

    if (!selectedProfile) {
      const userProfiles = await profileRepo.getUserProfiles();

      if (userProfiles) {
        throw new ProfileSelectionError(
          "User profiles are stored but no profile is selected"
        );
      } else {
        throw new ProfileExistenceError("There are no profiles stored");
      }
    }

    return selectedProfile;
  };
}
