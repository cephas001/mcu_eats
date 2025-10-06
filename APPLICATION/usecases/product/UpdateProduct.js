import {
  ProfileExistenceError,
  UnauthorizedError,
  UnexpectedError,
} from "../../domain/Error.js";
import { updateProductSchema } from "../../validators/product/validateProductData.js";
import { inputErrorHandler } from "../../utils/errorHandler.js";

export default function UpdateProduct(vendorRepo, productRepo) {
  return async function ({ userId, vendorId, productId, productData }) {
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

    const validatedUpdateProductData = inputErrorHandler(
      updateProductSchema,
      productData
    );

    try {
      const updatedProduct = await productRepo.updateProduct({
        vendorId,
        productId,
        validatedUpdateProductData,
      });

      return updatedProduct;
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to update a product",
        error
      );
    }
  };
}
