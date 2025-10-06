import {
  ProductExistenceError,
  ProfileExistenceError,
  UnauthorizedError,
  UnexpectedError,
  ValidationError,
} from "../../domain/Error.js";

export default function DeleteProducts(vendorRepo, productRepo) {
  return async function (vendorId, productIds) {
    let vendor = null;
    try {
      vendor = await vendorRepo.findById(vendorId);
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to fetch the vendor details",
        error
      );
    }

    if (!vendor) {
      throw new ProfileExistenceError("Vendor does not exists in database");
    }

    // CHANGE TO APPROVED LATER ON
    if (vendor.verificationStatus !== "pending") {
      throw new UnauthorizedError(
        "Vendor is not permitted to perform this action"
      );
    }

    if (vendor.userId !== userId) {
      throw new UnauthorizedError(
        "This user is not permitted to perform this action"
      );
    }

    if (!Array.isArray(productIds)) {
      throw new ValidationError("Product Ids must be defined as an array");
    }

    let productsExists = null;
    try {
      productsExists = await productRepo.checkMultipleProductsExistence(
        vendorId,
        productIds
      );
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to fetch product details",
        error
      );
    }

    if (!productsExists) {
      throw new ProductExistenceError(
        "Some products do not exist from the ids that were sent in"
      );
    }

    let productsDeleted = null;
    try {
      const deleted = await productRepo.deleteMultipleProducts(
        vendorId,
        productIds
      );

      productsDeleted = deleted;
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to deleted product",
        error
      );
    }

    try {
      if (!productsDeleted) return;

      const unlinked = await vendorRepo.unlinkMultipleProductsFromVendor(
        vendorId,
        productIds
      );

      return { deleted: productsDeleted, unlinked };
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to remove the product id from the vendor",
        error
      );
    }
  };
}
