import axios from "axios";

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: useRuntimeConfig().public.apiBaseUrl,
  });

  return {
    provide: {
      api,
    },
  };
});
