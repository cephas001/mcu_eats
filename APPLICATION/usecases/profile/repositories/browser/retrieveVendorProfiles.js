import {
  ValidationError,
  LocalStorageError,
  ProfileExistenceError,
} from "../../../../domain/Error.js";

export default function retrieveVendorProfiles(browserProfileRepo) {
  return async function () {
    try {
      var vendorProfiles = await browserProfileRepo.retrieveVendorProfiles();
    } catch (error) {
      throw new LocalStorageError(
        "An error occurred while trying to get the vendor profiles"
      );
    }

    if (!vendorProfiles) {
      throw new ProfileExistenceError("Vendor profiles are not stored locally");
    }

    for (const vendorProfile of vendorProfiles) {
      if (!vendorProfile.id) {
        throw new ValidationError("The profiles stored do not have an id");
      }
    }

    return vendorProfiles;
  };
}
