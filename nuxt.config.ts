// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    // The private keys which are only available server-side

    // Keys within public are also exposed client-side
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_RAPID_BASE,
      apiSecret: process.env.NUXT_API_SECRET,
    },
  },
  css: ["~/styles/global.scss", "@fortawesome/fontawesome-svg-core/styles.css"],
});
