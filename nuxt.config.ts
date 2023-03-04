// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    // The private keys which are only available server-side

    // Keys within public are also exposed client-side
    public: {
      apiBase: process.env.BASE_RAPID_URL,
      apiSecret: "5d99ed1e87msh336ffda5f50f370p177d16jsnc01cfe766594",
    },
  },
  css: ["~/styles/global.scss", "@fortawesome/fontawesome-svg-core/styles.css"],
});
