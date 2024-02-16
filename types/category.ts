import { DrinksListResponse } from "./drinks";

type CategoryResponse = CategoryPayload[];

type CategoryPayload = {
  strCategory: string;
};

type CategoryState = {
  categoryList: CategoryResponse | [];
  filteredByCategory: DrinksListResponse | [];
  drinksResults: DrinksListResponse | [];
};

export type { CategoryState, CategoryResponse, CategoryPayload };
