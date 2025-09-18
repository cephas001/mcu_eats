import * as BackendImplementation from "@/infrastructure/backend/index.js";

import { createApiClient } from "@/utils/api";

export default defineNuxtPlugin(() => {
  const api = createApiClient();

  const userApiService = new BackendImplementation.UserBackend(api);
  const authApiService = new BackendImplementation.AuthBackend(api);
  const consumerApiService = new BackendImplementation.ConsumerBackend(api);
  const deliverypersonApiService =
    new BackendImplementation.DeliveryPersonBackend(api);
  const notificationApiService = new BackendImplementation.NotificationBackend(
    api
  );
  const orderApiService = new BackendImplementation.OrderBackend(api);
  const paymentApiService = new BackendImplementation.PaymentBackend(api);
  const productApiService = new BackendImplementation.ProductBackend(api);
  const profileApiService = new BackendImplementation.ProfileBackend(api);
  const vendorApiService = new BackendImplementation.VendorBackend(api);

  return {
    provide: {
      userApiService,
      authApiService,
      consumerApiService,
      deliverypersonApiService,
      notificationApiService,
      orderApiService,
      paymentApiService,
      productApiService,
      profileApiService,
      vendorApiService,
    },
  };
});
