import * as CartUseCases from "../../APPLICATION/usecases/cart/index.js";

export const CreateCartUseCase = CartUseCases.CreateCart();
export const DeleteCartUseCase = CartUseCases.DeleteCart();
export const EstimateDeliveryCostUseCase = CartUseCases.EstimateDeliveryCost();
export const GetCartByUserUseCase = CartUseCases.GetCartByUser();
export const SaveCartForLaterUseCase = CartUseCases.SaveCartForLater();
export const RetrieveSavedCartUseCase = CartUseCases.RetrieveSavedCart();
