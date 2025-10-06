import * as VendorUseCases from "../../APPLICATION/usecases/vendor/index.js";

import MongoVendorRepository from "../infrastructure/repositories/MongoVendorRepository.js";
import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";

import * as Models from "../models/index.js";

const vendorRepo = new MongoVendorRepository(Models.User, Models.VendorProfile);

const userRepo = new MongoUserRepository(
  Models.User,
  Models.ConsumerProfile,
  Models.DeliveryPersonProfile,
  Models.VendorProfile
);

export const ApproveVendorApplicationUseCase =
  VendorUseCases.ApproveVendorApplication(vendorRepo);
export const CreateVendorUseCase = VendorUseCases.CreateVendor({
  userRepo,
  vendorRepo,
});
export const DeleteVendorUseCase = VendorUseCases.DeleteVendor(
  userRepo,
  vendorRepo
);
export const GetVendorByIdUseCase = VendorUseCases.GetVendorById(
  userRepo,
  vendorRepo
);
export const GetVendorOrdersUseCase = VendorUseCases.GetVendorOrders(
  userRepo,
  vendorRepo
);
export const GetVendorProductsUseCase = VendorUseCases.GetVendorProducts(
  userRepo,
  vendorRepo
);
export const GetVendorsUseCase = VendorUseCases.GetVendors(vendorRepo);
export const RejectVendorApplicationUseCase =
  VendorUseCases.RejectVendorApplication(vendorRepo);
export const UpdateVendorUseCase = VendorUseCases.UpdateVendor(vendorRepo);
export const UpdateVendorAvailabilityUseCase =
  VendorUseCases.UpdateVendorAvailability(vendorRepo);
