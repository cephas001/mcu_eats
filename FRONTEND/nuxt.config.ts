// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  alias: {
    "@/": resolve(__dirname, "/"),
  },

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@vueuse/nuxt", "@nuxt/ui", "@nuxt/image"],

  ui: {
    fonts: false,
  },

  icon: {
    serverBundle: {
      collections: ["material-symbols"],
    },
  },

  image: {
    dir: "assets/images",
  },
});
