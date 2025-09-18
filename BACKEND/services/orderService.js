import * as OrderUseCases from "../../APPLICATION/usecases/order/index.js";

export const CancelOrderUseCase = OrderUseCases.CancelOrder();
export const CompleteOrderUseCase = OrderUseCases.CompleteOrder();
export const GetOrderByIdUseCase = OrderUseCases.GetOrderById();
export const GetOrderSummaryUseCase = OrderUseCases.GetOrderSummary();
export const GetOrderTimelineUseCase = OrderUseCases.GetOrderTimeline();
export const GetOrdersByUserUseCase = OrderUseCases.GetOrdersByUser();
export const GetOrdersByVendorUseCase = OrderUseCases.GetOrdersByVendor();
export const ListOrdersByStatusUseCase = OrderUseCases.ListOrdersByStatus();
export const NotifyOrderReadyUseCase = OrderUseCases.NotifyOrderReady();
export const PlaceOrderUseCase = OrderUseCases.PlaceOrder();
export const RateOrderUseCase = OrderUseCases.RateOrder();
export const RefundOrderUseCase = OrderUseCases.RefundOrder();
export const UpdateOrderStatusUseCase = OrderUseCases.UpdateOrderStatus();
