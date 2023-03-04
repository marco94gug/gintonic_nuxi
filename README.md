## Migration from Nuxt2 to Nuxt3

Try some ways to make the best migration from Nuxt2 to Nuxt3

1. My first step: check the differences between Options API and Composition API, decided to follow the last one;

2. Considering to convert my Vuex Store in Pinia Store due to maintaning SSR, with useState maybe we lose it. ***to be further explored***;

3. Using [Composables](https://nuxt.com/docs/guide/directory-structure/composables#composables-directory) to create something like `axios instances` but using [useFetch](https://nuxt.com/docs/api/composables/use-fetch#usefetch) ***it could be a good idea?***

4. Founds some complications with .env configuration. ***to be further explored***;
