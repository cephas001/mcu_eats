import ExpressUserBackend from "../../infrastructure/backend/ExpressUserBackend.js";
import ExpressAuthBackend from "../../infrastructure/backend/ExpressAuthBackend.js";
import { createApiClient } from "~/utils/api";

export default defineNuxtPlugin(() => {
  const api = createApiClient();
  const expressUserBackendService = new ExpressUserBackend(api);
  const expressAuthBackendService = new ExpressAuthBackend(api);
  return {
    provide: {
      expressUserBackendService,
      expressAuthBackendService,
    },
  };
});
