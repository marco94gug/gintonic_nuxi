import type { DrinksListResponse } from "@/types/drinks";

export const dataListLength = (
  n: number,
  data: DrinksListResponse
): DrinksListResponse => {
  return data?.filter((_, i: number) => i < n);
};
