import * as PaymentUseCases from "../../APPLICATION/usecases/payment/index.js";

export const GetPaymentHistoryUseCase = PaymentUseCases.GetPaymentHistory();
export const GetRefundHistoryUseCase = PaymentUseCases.GetRefundHistory();
export const InitiatePaymentUseCase = PaymentUseCases.InitiatePayment();
export const IssueRefundUseCase = PaymentUseCases.IssueRefund();
export const RemovePaymentMethodUseCase = PaymentUseCases.RemovePaymentMethod();
export const SavePaymentMethodUseCase = PaymentUseCases.SavePaymentMethod();
export const ValidatePaymentMethodUseCase =
  PaymentUseCases.ValidatePaymentMethod();
export const VerifyPaymentUseCase = PaymentUseCases.VerifyPayment();
