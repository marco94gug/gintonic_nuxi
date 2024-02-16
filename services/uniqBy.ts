import type { DrinkPayload, DrinksListResponse } from "@/types/drinks";

export function uniqBy(a: DrinksListResponse): DrinksListResponse {
  var seen = {} as Record<string, unknown>;
  return a.filter(function (item: DrinkPayload) {
    var k = item;
    return seen.hasOwnProperty(k.idDrink) ? false : (seen[k.idDrink] = true);
  });
}
