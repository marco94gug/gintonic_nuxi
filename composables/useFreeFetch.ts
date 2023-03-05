export const useFreeFetch = (
  request: any,
  opts: Record<string, Record<string, string>>
) => {
  const runtimeConfig = useRuntimeConfig();
  return useFetch(request, {
    baseURL: runtimeConfig.public.apiFreeBase,
    headers: {
      "Content-Type": "application/json",
    },
    ...opts,
  });
};
