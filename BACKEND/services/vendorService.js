import * as VendorUseCases from "../../APPLICATION/usecases/vendor/index.js";

import MongoVendorRepository from "../infrastructure/repositories/MongoVendorRepository.js";

import User from "../models/userModel.js";
import VendorProfile from "../models/vendorProfileModel.js";

const vendorRepo = new MongoVendorRepository(User, VendorProfile);

export const ApproveVendorApplicationUseCase =
  VendorUseCases.ApproveVendorApplication(vendorRepo);
export const CreateVendorUseCase = VendorUseCases.CreateVendor(vendorRepo);
export const DeleteVendorUseCase = VendorUseCases.DeleteVendor(vendorRepo);
export const GetVendorByIdUseCase = VendorUseCases.GetVendorById(vendorRepo);
export const GetVendorOrdersUseCase =
  VendorUseCases.GetVendorOrders(vendorRepo);
export const GetVendorProductsUseCase =
  VendorUseCases.GetVendorProducts(vendorRepo);
export const GetVendorsUseCase = VendorUseCases.GetVendors(vendorRepo);
export const RejectVendorApplicationUseCase =
  VendorUseCases.RejectVendorApplication(vendorRepo);
export const UpdateVendorUseCase = VendorUseCases.UpdateVendor(vendorRepo);
export const UpdateVendorAvailabilityUseCase =
  VendorUseCases.UpdateVendorAvailability(vendorRepo);
