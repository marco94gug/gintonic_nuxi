# Migration from Nuxt2 to Nuxt3

Try some ways to make the best migration from Nuxt2 to Nuxt3

1. My first step: check the differences between Options API and Composition API, decided to follow the last one;

2. Considering to convert my Vuex Store in Pinia Store due to maintaning SSR, with useState maybe we lose it. **_to be further explored_**;

3. Using [Composables](https://nuxt.com/docs/guide/directory-structure/composables#composables-directory) to create something like `axios instances` but using [useFetch](https://nuxt.com/docs/api/composables/use-fetch#usefetch) **_it could be a good idea?_**

4. Founds some complications with .env configuration. **_to be further explored_**;

5. Founds solution with `apiBase` values and `apiSecret` (api key values), the variables on `.env` should start with `NUXT_`;

6. Created pages and resolved the bug relates 'pages not found - robots.txt', fixed installing robots nuxt module

7. Fixed the bug on middleware where when you changed the route you lost the data from Pinia store,

   - _*the problem was related to custom useFetch maybe it wasn't able to read config.public from runtime `to be further explored`*_

8. Preferred use `useFetch` insead the custom one created before like `composables` cause this give me some errors when calls passing from SSR to Client **_to be investigate_** maybe the problems are relates to `.env` and `useRuntimeConfig()`

9. It could be nice to use `useFetch` for better Typescript app.

10. Created middleware for fetch api call SSR, and using `from` param of Route Middleware function to get `id` from the url params.

11. Define Emits on `Breadcrumbs` Component, look like more readable than before emits, that one give more 'info'

12. Created an HTML `ref` on `Carousel` Component, it's not too different from old version, only the typing changes, see the references [Refs Typescript](https://vuejs.org/guide/typescript/composition-api.html#typing-template-refs)

13. Implemented the search-page on `_categoryName.vue` i think it was the hardest migration step, should analyze the code for make it better,
    for have a reactive page with store data, never assign it on a variable, like:
    - ```
        const nameStore = useNamestore();
        const dataStore = nameStore.data
      ```
14. Created `Card` component

15. To consider: Apply a loading state for search-page

16. Implemented the loading state for `drinkPage`

17. Updated the app to Nuxt 3.5.0, founds some problems with pinia, for fixing it i added this property on `package.json`:
    - ```
        "overrides": {
      "vue": "latest"
      }
      ```
