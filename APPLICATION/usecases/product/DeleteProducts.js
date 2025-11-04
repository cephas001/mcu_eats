import { ValidationError } from "../../domain/Error.js";
import { validateVendorAccess } from "../../validators/vendor/validateVendorAccess.js";

export default function DeleteProducts(vendorRepo, deleteProduct) {
  return async function ({ userId, vendorId, productIds }) {
    await validateVendorAccess(vendorRepo, { userId, vendorId });

    if (!Array.isArray(productIds) || productIds.length === 0) {
      throw new ValidationError(
        "Product Ids must be defined as a non-empty array"
      );
    }

    const results = await Promise.allSettled(
      productIds.map((productId) =>
        deleteProduct({ userId, vendorId, productId })
      )
    );

    const successes = results
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value.deleted);
    const failures = results
      .filter((r) => r.status === "rejected")
      .map((r) => r.reason);

    return {
      deletedCount: successes.length,
      failedCount: failures.length,
      errors: failures,
      deletedProducts: successes,
    };
  };
}
