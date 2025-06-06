import { useCookie } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("storeToken", (token) => {
    const authToken = useCookie("auth_token", {
      maxAge: 60 * 60 * 24 * 5, // 5-days expiration
      secure: true, // Only use in HTTPS environments
      sameSite: "strict", // Prevent cross-site attacks
    });

    authToken.value = token;
  });
});
