import {
  ProfileExistenceError,
  UnauthorizedError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function GetProductsByVendor(vendorRepo, productRepo) {
  return async function (vendorId) {
    let vendor = null;
    try {
      vendor = await vendorRepo.findById(vendorId);
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to fetch vendor data",
        error
      );
    }

    if (!vendor)
      throw new ProfileExistenceError("Vendor does not exist in database");

    // CHANGE TO APPROVED LATER
    if (vendor.verificationStatus !== "pending") {
      throw new UnauthorizedError(
        "This vendor is not permitted to carry out this action"
      );
    }

    try {
      const products = await productRepo.getProductsByVendor(vendorId);

      const unarchivedProducts = products.filter(
        (product) => product.isArchived === false
      );

      return unarchivedProducts;
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to add the product id to vendor",
        error
      );
    }
  };
}
