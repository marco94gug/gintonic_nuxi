import { _AsyncData } from "nuxt/dist/app/composables/asyncData";

export const useRapidFetch = (
  request: any,
  opts: Record<string, Record<string, string>>
) => {
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
