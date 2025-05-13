// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/fonts"],
  css: ["~/assets/css/main.css"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  fonts: {
    families: [{ name: "Manrope", provider: "google" }],
  },
});
