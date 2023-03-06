# Migration from Nuxt2 to Nuxt3

Try some ways to make the best migration from Nuxt2 to Nuxt3

1. My first step: check the differences between Options API and Composition API, decided to follow the last one;

2. Considering to convert my Vuex Store in Pinia Store due to maintaning SSR, with useState maybe we lose it. **_to be further explored_**;

3. Using [Composables](https://nuxt.com/docs/guide/directory-structure/composables#composables-directory) to create something like `axios instances` but using [useFetch](https://nuxt.com/docs/api/composables/use-fetch#usefetch) **_it could be a good idea?_**

4. Founds some complications with .env configuration. **_to be further explored_**;

5. Founds solution with `apiBase` values and `apiSecret` (api key values), the variables on `.env` should start with `NUXT_`;

6. Created pages and resolved the bug relates 'pages not found - robots.txt', fixed installing robots nuxt module

7. Fixed the bug on middleware where when you changed the route you lost the data from Pinia store,
   _the problem was related to custom useFetch maybe it wasn't able to read config.public from runtime `to be further explored`_
