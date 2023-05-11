interface DrinkPayload {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string;
  strTags: string;
  strVideo: string;
  strCategory: string;
  strIBA: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string;
  strInstructionsDE: string;
  strInstructionsFR: string;
  strInstructionsIT: string;
  "strInstructionsZH-HANS": string;
  "strInstructionsZH-HANT": string;
  strDrinkThumb: string;
  ingredients: Ingredients[];
  strImageSource: string;
  strImageAttribution: string;
  strCreativeCommonsConfirmed: string;
  dateModified?: string;
}

type DrinksListResponse = DrinkPayload[];

type Ingredients = {
  ingredient: string;
  measure: string;
};

interface DrinksStoreState {
  drink: DrinkPayload | {};
  topDrinks: DrinksListResponse | [];
  mostLatestDrinks: DrinksListResponse | [];
  lodaingDrink: boolean;
  loadingTopDrinks: boolean;
  loadingLatestDrinks: boolean;
}

export { DrinksStoreState, Ingredients, DrinksListResponse, DrinkPayload };
