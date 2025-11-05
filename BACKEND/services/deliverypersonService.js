import * as DeliverypersonUseCases from "../../APPLICATION/usecases/deliveryperson/index.js";

import MongoDeliveryPersonRepository from "../infrastructure/repositories/MongoDeliveryPersonRepository.js";
import MongoUserRepository from "../infrastructure/repositories/MongoUserRepository.js";

import * as Models from "../models/index.js";

const deliveryPersonRepo = new MongoDeliveryPersonRepository(
  Models.User,
  Models.DeliveryPersonProfile
);

const userRepo = new MongoUserRepository(
  Models.User,
  Models.ConsumerProfile,
  Models.DeliveryPersonProfile,
  Models.VendorProfile
);

export const AcceptDeliveryUseCase = DeliverypersonUseCases.AcceptDelivery();
export const AssignDeliveryUseCase = DeliverypersonUseCases.AssignDelivery();
export const CreateDeliveryPersonUseCase =
  DeliverypersonUseCases.CreateDeliveryPerson(deliveryPersonRepo, userRepo);
export const DeclineDeliveryUseCase = DeliverypersonUseCases.DeclineDelivery();
export const DeleteDeliveryPersonUseCase =
  DeliverypersonUseCases.DeleteDeliveryPerson();
export const GetDeliveriesByAreaUseCase =
  DeliverypersonUseCases.GetDeliveriesByArea();
export const GetDeliveryHistoryUseCase =
  DeliverypersonUseCases.GetDeliveryHistory();
export const GetDeliveryPersonByIdUseCase =
  DeliverypersonUseCases.GetDeliveryPersonById();
export const TrackDeliveryUseCase = DeliverypersonUseCases.TrackDelivery();
export const UpdateDeliveryPersonUseCase =
  DeliverypersonUseCases.UpdateDeliveryPerson();
export const UpdateDeliveryStatusUseCase =
  DeliverypersonUseCases.UpdateDeliveryStatus();
