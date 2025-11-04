import { ProductExistenceError, UnexpectedError } from "../../domain/Error.js";

import { validateVendorAccess } from "../../validators/vendor/validateVendorAccess.js";

export default function DeleteProduct(vendorRepo, productRepo) {
  return async function ({ userId, vendorId, productId }) {
    await validateVendorAccess(vendorRepo, { userId, vendorId });

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
