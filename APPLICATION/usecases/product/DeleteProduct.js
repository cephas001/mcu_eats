import {
  ProductExistenceError,
  ProfileExistenceError,
  UnauthorizedError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function DeleteProduct(vendorRepo, productRepo) {
  return async function ({ userId, vendorId, productId }) {
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

    let product = null;
    try {
      product = await productRepo.findById(vendorId, productId);
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to fetch product details",
        error
      );
    }

    if (!product) {
      throw new ProductExistenceError(
        "This product does not exists in the database"
      );
    }

    let productDeleted = null;
    try {
      const deleted = await productRepo.deleteProduct(vendorId, productId);

      productDeleted = deleted;
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to deleted product",
        error
      );
    }

    try {
      if (!productDeleted) return;

      const unlinked = await vendorRepo.unlinkProductFromVendor(
        vendorId,
        productId
      );

      return { deleted: productDeleted, unlinked };
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to remove the product id from the vendor",
        error
      );
    }
  };
}
