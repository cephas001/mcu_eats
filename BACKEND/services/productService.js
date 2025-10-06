import MongoProductRepository from "../infrastructure/repositories/MongoProductRepository.js";
import MongoVendorRepository from "../infrastructure/repositories/MongoVendorRepository.js";

import * as ProductUseCases from "../../APPLICATION/usecases/product/index.js";

import * as Models from "../models/index.js";

const productRepo = new MongoProductRepository(
  Models.Product,
  Models.VendorProfile
);
const vendorRepo = new MongoVendorRepository(Models.User, Models.VendorProfile);

export const CreateComboUseCase = ProductUseCases.CreateCombo(
  vendorRepo,
  productRepo
);
export const CreateProductUseCase = ProductUseCases.CreateProduct(
  vendorRepo,
  productRepo
);
export const DeleteComboUseCase = ProductUseCases.DeleteCombo(
  vendorRepo,
  productRepo
);
export const DeleteProductUseCase = ProductUseCases.DeleteProduct(
  vendorRepo,
  productRepo
);
export const GetProductByIdUseCase = ProductUseCases.GetProductById(
  vendorRepo,
  productRepo
);
export const GetProductsByCategoryUseCase =
  ProductUseCases.GetProductsByCategory(vendorRepo, productRepo);
export const GetProductsByVendorUseCase = ProductUseCases.GetProductsByVendor(
  vendorRepo,
  productRepo
);
export const GetAllVendorProductsUseCase = ProductUseCases.GetAllVendorProducts(
  { vendorRepo, productRepo }
);
export const ListCombosUseCase = ProductUseCases.ListCombos(
  vendorRepo,
  productRepo
);
export const SearchProductsUseCase = ProductUseCases.SearchProducts(
  vendorRepo,
  productRepo
);
export const SetProductAvailaibiltyUseCase =
  ProductUseCases.SetProductAvailaibilty(vendorRepo, productRepo);
export const UpdateComboUseCase = ProductUseCases.UpdateCombo(
  vendorRepo,
  productRepo
);
export const UpdateProductUseCase = ProductUseCases.UpdateProduct(
  vendorRepo,
  productRepo
);
