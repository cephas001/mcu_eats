import * as ConsumerUseCases from "../../APPLICATION/usecases/consumer/index.js";

export const CreateConsumerUseCase = ConsumerUseCases.CreateConsumer();
export const CreateFavoriteUseCase = ConsumerUseCases.CreateFavorite();
export const DeleteConsumerUseCase = ConsumerUseCases.DeleteConsumer();
export const GetConsumerByIdUseCase = ConsumerUseCases.GetConsumerById();
export const GetConsumerOrdersUseCase = ConsumerUseCases.GetConsumerOrders();
export const GetFavoritesUseCase = ConsumerUseCases.GetFavorites();
export const RateVendorUseCase = ConsumerUseCases.RateVendor();
export const RemoveFavoriteUseCase = ConsumerUseCases.RemoveFavorite();
export const UpdateConsumerUseCase = ConsumerUseCases.UpdateConsumer();
