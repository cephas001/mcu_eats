import { defineNuxtConfig } from "nuxt/config";
import { resolve } from "path";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  alias: {
    "@/": resolve(__dirname, "/"),
  },

  app: {
    fetch: { credentials: "include" },
    head: {
      title: "MCU EATS",
      htmlAttrs: { lang: "en" },
      meta: [
        {
          name: "description",
          content:
            "This is a food delivery application for McPherson University",
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },

  plugins: [
    "~/plugins/services/firebase.client.js",
    "~/plugins/services/backend.client.js",
    "~/plugins/services/indexedDB/profile.client.js",
    "~/plugins/services/indexedDB/user.client.js",
    "~/plugins/services/indexedDB/vendor.client.js",
    "~/plugins/services/indexedDB/cart.client.js",
  ],

  modules: [
    "@vueuse/nuxt",
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],

  ui: {
    fonts: false,
  },

  image: {
    dir: "assets/images",
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    },
  },

  ssr: true,
});
