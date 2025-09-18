import * as DeliverypersonUseCases from "../../APPLICATION/usecases/deliveryperson/index.js";

export const AcceptDeliveryUseCase = DeliverypersonUseCases.AcceptDelivery();
export const AssignDeliveryUseCase = DeliverypersonUseCases.AssignDelivery();
export const CreateDeliveryPersonUseCase =
  DeliverypersonUseCases.CreateDeliveryPerson();
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
