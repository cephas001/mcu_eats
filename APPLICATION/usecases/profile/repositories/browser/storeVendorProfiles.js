import {
  ValidationError,
  LocalStorageError,
} from "../../../../domain/Error.js";

export default function storeVendorProfiles(browserProfileRepo) {
  return async function (vendorProfiles) {
    if (!vendorProfiles) {
      throw new ValidationError("Vendor profiles data is not defined", null);
    }

    if (!Array.isArray(vendorProfiles) || vendorProfiles?.length == 0) {
      throw new ValidationError(
        "Vendors profiles data must a non-empty array",
        null
      );
    }

    for (const vendorProfile of vendorProfiles) {
      if (!vendorProfile.id) {
        throw new ValidationError("Vendor profile id is not defined", null);
      }
    }

    try {
      await browserProfileRepo.clearVendorProfiles();

      const storedVendorProfiles = await browserProfileRepo.storeVendorProfiles(
        vendorProfiles
      );

      return storedVendorProfiles;
    } catch (error) {
      throw new LocalStorageError("An error occurred while storing vendors");
    }
  };
}
