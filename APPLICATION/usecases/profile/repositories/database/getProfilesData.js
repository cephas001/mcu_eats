import { ValidationError, UnexpectedError } from "../../../../domain/Error.js";

export default function createProfile(profileRepo) {
  return async function (profileIds) {
    if (!profileIds || !Array.isArray(profileIds)) {
      throw new ValidationError("Profile Ids are not properly defined", null);
    }

    try {
      const profilesData = await profileRepo.getProfilesData(profileIds);
      return profilesData;
    } catch (error) {
      throw new UnexpectedError("An unexpected error occurred");
    }
  };
}
