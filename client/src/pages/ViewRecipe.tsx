import React, { useEffect, useState } from "react";
import {
  initCurrentRecipe,
  resetRecipe,
  resetSpecials,
  initSpecials,
} from "../app/recipeSlice";
import { useSelector, useDispatch } from "react-redux";
import { ISpecials } from "../types/SpecialsType";
import { useParams } from "react-router-dom";
import { IStore } from "../types/StoreInterface";
import { IRecipe } from "../types/RecipeType";
import RecipeItem from "../components/HomePage/RecipeItem";
import ViewRecipeBody from "../components/ViewRecipes/ViewRecipeBody";
import ViewEditRecipe from "../components/ViewRecipes/ViewEditRecipe";
import Spinner from "../shared/Spinner/Spinner";

interface Props {
  edit?: boolean;
}

const RecipeView: React.FC<Props> = ({edit = false}) => {
  
  const [specials, setSpecials] = useState<ISpecials[]>();
  const [specialsError, setSpecialsError] = useState<boolean>(false);
  const [currentRecipe, setCurrentRecipe] = useState<IRecipe>();

  const store = useSelector((state: { recipesStore: IStore }) => state.recipesStore);

  const dispatch = useDispatch();

  const { id } = useParams<any>();

  useEffect(() => {
    if (!store.currentRecipe.loaded && !store.currentRecipe.error) {
      dispatch(initCurrentRecipe(id));
    }
    return () => {
      dispatch(resetRecipe());
      dispatch(resetSpecials());
    };
  }, []);

  useEffect(() => {
    if (store.currentRecipe.current) {
      setCurrentRecipe(store.currentRecipe.current[0]);
    }
    if (
      !store.specials.loaded &&
      !store.specials.error &&
      store.currentRecipe.current
    ) {
      getSpecialsFromIds(store.currentRecipe.current[0].ingredients);
    }

    if(store.specials.specialsList){
      setSpecials(store.specials.specialsList)
    }

    if (store.specials.error) {
      setSpecialsError(true);
    }

  }, [store]);

  const getSpecialsFromIds = async (ingredients: any) => {
    // Extract all the availables ingredients UUID.
    // Then join them in a string so it can be used as a parameter to get the specials in the request.
    const _ingredients = ingredients?.map((i: any) => {
      return "ingredientId=" + i.uuid + "&";
    });

    if(!_ingredients) return;
    
    const ingredientsToParameters = _ingredients.join("");

    dispatch(initSpecials(ingredientsToParameters));
  };

  if (store.currentRecipe.loading) {
    return <Spinner >Loading....</Spinner>;
  }

  return (
    <>
      {edit ? (
        <div>
          {currentRecipe && (
            <ViewEditRecipe
              recipe={currentRecipe}
            />
          )}
        </div>
      ) : (
        <div>
          {currentRecipe && (
            <RecipeItem recipe={currentRecipe} fullview={true} />
          )}
          {currentRecipe && (
            <ViewRecipeBody
              recipe={currentRecipe}
              specials={specials}
              specialError={specialsError}
            />
          )}
        </div>
      )}
    </>
  );
};

export default RecipeView;
