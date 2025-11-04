import {
  UnauthorizedError,
  ProfileExistenceError,
} from "../../domain/Error.js";

export async function validateVendorAccess(vendorRepo, { userId, vendorId }) {
  const vendor = await vendorRepo.findById(vendorId);
  if (!vendor) throw new ProfileExistenceError("Vendor does not exist");

  // CHANGE WHEN STATUS RULE CHANGES
  if (vendor.verificationStatus !== "pending") {
    throw new UnauthorizedError(
      "Vendor is not permitted to perform this action"
    );
  }

  if (vendor.userId !== userId) {
    throw new UnauthorizedError("User is not permitted to perform this action");
  }

  return vendor;
}
