export const useRapidFetch = (request: any, opts: any) => {
  const runtimeConfig = useRuntimeConfig();
  return useFetch(request, {
    baseURL: runtimeConfig.public.apiBase,
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": runtimeConfig.public.apiSecret,
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
    ...opts,
  });
};
