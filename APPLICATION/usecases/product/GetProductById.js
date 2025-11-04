import {
  ProductExistenceError,
  ProfileExistenceError,
  UnexpectedError,
} from "../../domain/Error.js";

export default function GetProductById(vendorRepo, productRepo) {
  return async function (vendorId, productId) {
    try {
      const vendor = await vendorRepo.findById(vendorId);
      if (!vendor) {
        throw new ProfileExistenceError(`Vendor with ID ${vendorId} not found`);
      }

      const hasProduct = vendor.products.includes(productId);
      if (!hasProduct) {
        throw new ProductExistenceError(
          `Product ${productId} does not belong to this vendor`
        );
      }

      const product = await productRepo.findById(vendorId, productId);
      if (!product) {
        throw new ProductExistenceError(
          `Product with ID ${productId} not found`
        );
      }

      return product;
    } catch (error) {
      throw new UnexpectedError("Failed to get product", error);
    }
  };
}
