#Migration from Nuxt2 to Nuxt3

try some ways to make the best migration from Nuxt2 with Vuex Store to Nuxt3

    - My first step: check the differences between Options API and Composition API, decided to follow the last one;

    - Considering to convert my Vuex Store in Pinia Store due to maintaning SSR status, with useState maybe we lose it. `to be further explored`;

    - Using `Composables` to create something like `axios instances` but using `useFetch`
        *ref:
            Composables: https://nuxt.com/docs/guide/directory-structure/composables#composables-directory
            useFetch: https://nuxt.com/docs/api/composables/use-fetch#usefetch

    - Founds some complications with .env configuration. `to be further explored`;
