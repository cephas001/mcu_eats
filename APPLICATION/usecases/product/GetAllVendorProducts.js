import {
  ProfileExistenceError,
  UnauthorizedError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function GetAllVendorProducts({ vendorRepo, productRepo }) {
  return async function ({ userId, vendorId }) {
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

    if (vendor.userId !== userId) {
      throw new UnauthorizedError(
        "This user is not permitted to perform this action"
      );
    }

    let products = [];
    let archivedProducts = [];
    let unarchivedProducts = [];
    try {
      products = await productRepo.getProductsByVendor(vendorId);

      if (products.length > 0) {
        unarchivedProducts = products.filter(
          (product) => product.isArchived === false
        );

        archivedProducts = products.filter(
          (product) => product.isArchived === true
        );
      }

      return { unarchivedProducts, archivedProducts, allProducts: products };
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to add the product id to vendor",
        error
      );
    }
  };
}
