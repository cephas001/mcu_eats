import { UnexpectedError } from "../../domain/Error.js";

export default function GetVendors(vendorRepo) {
  return async function () {
    try {
      const vendorProfiles = await vendorRepo.getVendors();

      if (!vendorProfiles || vendorProfiles?.length == 0) {
        return [];
      }

      return vendorProfiles;
    } catch (error) {
      throw new UnexpectedError(
        "An error occurred while trying to get the vendor proiles",
        error
      );
    }
  };
}
