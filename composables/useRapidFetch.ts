export const useRapidFetch = (request: any, opts: any) => {
  return useFetch(request, {
    baseURL: "https://the-cocktail-db.p.rapidapi.com",
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "5d99ed1e87msh336ffda5f50f370p177d16jsnc01cfe766594",
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
    ...opts,
  });
};
