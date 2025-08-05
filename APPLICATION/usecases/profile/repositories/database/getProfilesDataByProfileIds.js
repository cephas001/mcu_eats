import { ValidationError, UnexpectedError } from "../../../../domain/Error.js";

export default function getProfilesDataByProfileIds(profileRepo) {
  return async function (profileIds) {
    if (!profileIds || !Array.isArray(profileIds) || profileIds?.length == 0) {
      throw new ValidationError("Profile Ids are not properly defined", null);
    }

    try {
      const profilesData = await profileRepo.getProfilesDataByProfileIds(
        profileIds
      );

      return profilesData;
    } catch (error) {
      throw new UnexpectedError("An unexpected error occurred");
    }
  };
}
