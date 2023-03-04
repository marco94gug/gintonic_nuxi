import { drinksListType } from "./drinks";

type CategoryResponse = {
  drinks: Array<DrinksType>;
};

type DrinksType = {
  strCategory: string;
};

type DrinkFiltered = {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
};

interface FilteredDrinkByCategory {
  drinks: DrinkFiltered[];
}

type CategoryListType = {
  categoryList: CategoryResponse;
  filteredByCategory: FilteredDrinkByCategory;
  drinksResults: drinksListType;
};

export {
  CategoryListType,
  CategoryResponse,
  DrinksType,
  DrinkFiltered,
  FilteredDrinkByCategory,
};
