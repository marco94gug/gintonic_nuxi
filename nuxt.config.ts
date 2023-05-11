// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
import { createCommonJS } from "mlly";
const { __dirname } = createCommonJS(import.meta.url);

export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,
    // The private keys which are only available server-side

    // Keys within public are also exposed client-side
    public: {
      baseURL: process.env.NUXT_BASE_API,
      apiBase: process.env.NUXT_PUBLIC_API_RAPID_BASE,
      apiFreeBase: process.env.NUXT_BASE_FREEAPI_URL,
      apiSecret: process.env.NUXT_API_SECRET,
    },
  },
  css: ["~/styles/global.scss", "@fortawesome/fontawesome-svg-core/styles.css"],

  hooks: {
    "pages:extend"(pages) {
      pages.push(
        {
          name: "drink",
          path: "/drink/:id",
          file: resolve(__dirname, "pages/-drink.vue"),
        },
        {
          name: "search-page",
          path: "/lookup/",
          file: resolve(__dirname, "pages/_searchPage/index.vue"),
        }
      );
    },
  },
});
