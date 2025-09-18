import * as ProductUseCases from "../../APPLICATION/usecases/product/index.js";

export const CreateComboUseCase = ProductUseCases.CreateCombo();
export const CreateProductUseCase = ProductUseCases.CreateProduct();
export const DeleteComboUseCase = ProductUseCases.DeleteCombo();
export const DeleteProductUseCase = ProductUseCases.DeleteProduct();
export const GetProductByIdUseCase = ProductUseCases.GetProductById();
export const GetProductsByCategoryUseCase =
  ProductUseCases.GetProductsByCategory();
export const GetProductsByVendorUseCase = ProductUseCases.GetProductsByVendor();
export const ListCombosUseCase = ProductUseCases.ListCombos();
export const SearchProductsUseCase = ProductUseCases.SearchProducts();
export const SetProductAvailaibiltyUseCase =
  ProductUseCases.SetProductAvailaibilty();
export const UpdateComboUseCase = ProductUseCases.UpdateCombo();
export const UpdateProductUseCase = ProductUseCases.UpdateProduct();
