interface drinkType {
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

type drinksListType = drinkType[];

type drinksRes = {
  drinks: drinksListType;
};

type Ingredients = {
  ingredient: string;
  measure: string;
};

interface drinksState {
  drink: drinkType;
  topDrinks: drinksListType;
  mostLatestDrinks: drinksListType;
  lodaingDrink: boolean;
  loadingTopDrinks: boolean;
  loadingLatestDrinks: boolean;
}

export { drinkType, drinksListType, drinksRes, drinksState, Ingredients };
