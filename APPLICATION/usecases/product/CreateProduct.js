import Product from "../../domain/Product.js";
import {
  ProfileExistenceError,
  UnexpectedError,
  UnauthorizedError,
} from "../../domain/Error.js";
import { createProductSchema } from "../../validators/product/validateProductData.js";
import { inputErrorHandler } from "../../utils/errorHandler.js";

export default function CreateProduct(vendorRepo, productRepo) {
  return async function ({ userId, vendorId, productData }) {
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

    const validatedProductData = inputErrorHandler(
      createProductSchema,
      productData
    );

    let createdProduct = null;
    let createdProductId = null;
    try {
      const productToSave = new Product(validatedProductData);

      const { product, productId } = await productRepo.createProduct(
        vendorId,
        productToSave
      );

      createdProduct = product;
      createdProductId = productId;
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to create a product",
        error
      );
    }

    try {
      const updatedVendor = await vendorRepo.linkProductToVendor(
        vendorId,
        createdProductId
      );

      return { updatedVendor, createdProduct, createdProductId };
    } catch (error) {
      throw new UnexpectedError(
        "An unexpected error occurred while trying to add the product id to vendor",
        error
      );
    }
  };
}
