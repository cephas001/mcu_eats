import * as ConsumerUseCases from "../../APPLICATION/usecases/consumer/index.js";

import MongoConsumerRepository from "../infrastructure/repositories/MongoConsumerRepository.js";
import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";

import * as Models from "../models/index.js";

const vendorRepo = new MongoConsumerRepository(
  Models.User,
  Models.VendorProfile
);

const userRepo = new MongoUserRepository(
  Models.User,
  Models.ConsumerProfile,
  Models.DeliveryPersonProfile,
  Models.VendorProfile
);

export const CreateConsumerUseCase = ConsumerUseCases.CreateConsumer();
export const CreateFavoriteUseCase = ConsumerUseCases.CreateFavorite();
export const DeleteConsumerUseCase = ConsumerUseCases.DeleteConsumer();
export const GetConsumerByIdUseCase = ConsumerUseCases.GetConsumerById();
export const GetConsumerOrdersUseCase = ConsumerUseCases.GetConsumerOrders();
export const GetFavoritesUseCase = ConsumerUseCases.GetFavorites();
export const RateVendorUseCase = ConsumerUseCases.RateVendor();
export const RemoveFavoriteUseCase = ConsumerUseCases.RemoveFavorite();
export const UpdateConsumerUseCase = ConsumerUseCases.UpdateConsumer();
