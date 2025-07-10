import { useNuxtApp } from "nuxt/app";
import ExpressUserBackend from "../../infrastructure/backend/ExpressUserBackend.js";
import { createApiClient } from "~/utils/api";

export default defineNuxtPlugin(() => {
  const api = createApiClient();
  const expressUserBackendService = new ExpressUserBackend(api);

  return {
    provide: {
      expressUserBackendService,
    },
  };
});
