import { UnexpectedError } from "../../../../domain/Error.js";

export default function getVendorProfiles(profileRepo) {
  return async function () {
    try {
      const vendorProfiles = await profileRepo.getProfilesDataByType("vendor");

      if (!vendorProfiles || vendorProfiles?.length == 0) {
        return [];
      }

      // REPLACE 'PENDING' LATER ON
      const approvedVendors = vendorProfiles.filter(
        (profile) => profile.data.verificationStatus === "pending"
      );

      return approvedVendors;
    } catch (error) {
      throw new UnexpectedError(
        "An error occurred while trying to get profiles data"
      );
    }
  };
}
