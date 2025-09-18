import {
  ValidationError,
  LocalStorageError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function CreateVendors(profileRepo) {
  return async function (vendorProfiles) {
    if (!vendorProfiles) {
      throw new ValidationError("Vendor profiles data is not defined");
    }

    if (!Array.isArray(vendorProfiles) || vendorProfiles?.length == 0) {
      throw new ValidationError("Vendors profiles data must a non-empty array");
    }

    try {
      const createdVendorProfiles = await profileRepo.createVendors(
        vendorProfiles
      );

      return createdVendorProfiles;
    } catch (error) {
      console.log(error);
      throw new UnexpectedError("An error occurred while storing vendors");
    }
  };
}
