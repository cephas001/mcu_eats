import { UnexpectedError, ValidationError } from "../../domain/Error.js";

export default function GetVendorById(vendorRepo) {
  return async function (vendorId) {
    try {
      if (!vendorId) {
        throw new ValidationError("Vendor ID is required", "vendorId");
      }

      const vendorProfile = await vendorRepo.getVendorById(vendorId);

      if (!vendorProfile) {
        return null;
      }

      if (vendorProfile.verificationStatus !== "pending") {
        return null;
      }

      return vendorProfile;
    } catch (error) {
      console.log(error);
      throw new UnexpectedError(
        "An error occurred while trying to get the vendor profile by ID",
        error
      );
    }
  };
}
/* 

  Requirements: Id,
  Logic: 
    Fetch vendor by Id from vendor repository,
    Only vendors that have been approved can be fetched, 
  Returns: Vendor Object

*/
