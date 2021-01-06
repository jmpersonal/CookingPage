import {IRecipe} from './RecipeType'
import {ISpecials} from './SpecialsType'

export interface IStore {
  currentRecipe: {
    current: IRecipe[],
    loading: false,
    loaded: false,
    error: false,
  },

  recipes: {
    recipesList: IRecipe[];
    loading: boolean;
    loaded: boolean;
    error: boolean;
  };

  specials: {
    specialsList: ISpecials[];
    loading: boolean;
    loaded: boolean;
    error: boolean;
  };

  update_recipe: {
    loading: boolean;
    loaded: boolean;
    error: boolean;
  }
 
}