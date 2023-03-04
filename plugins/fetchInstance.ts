export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const headers = {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": config.public.apiSecret,
    "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
  } as Record<string, string>;

  const rapidFetch = async (
    path: string,
    opts: Record<string, Record<string, string>>
  ) => {
    const res = await $fetch(`${config.public.apiBase}/${path}`, {
      ...opts,
      headers,
    });

    return res;
  };

  const freeCocktailFetch = async (
    path: string,
    params: Record<string, string>
  ) => {
    const res = await $fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/${path}`,
      {
        params,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  };

  return {
    provide: {
      rapidFetch,
      freeCocktailFetch,
    },
  };
});
