import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initData, resetAllRecipe } from "../app/recipeSlice";
import RecipeItem from "../components/HomePage/RecipeItem";
import Spinner from "../shared/Spinner/Spinner";
import { IRecipe } from "../types/RecipeType";
import { IStore } from "../types/StoreInterface";



const HomePage: React.FC = () => {
  const recipeStore = useSelector(
    (state: { recipesStore: IStore }) => state.recipesStore.recipes
  );

  const [recipeList, setRecipeList] = useState<IRecipe[]>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!recipeStore.loaded) {
      dispatch(initData());
    }

  }, []);

  useEffect(() => {
    if (recipeStore.recipesList) {
      let recipes = recipeStore.recipesList;
      setRecipeList(recipes);
    }
  }, [recipeStore]);

    // The below checks for loading or errors before rendering the main components.
  if (recipeStore.loading && !recipeStore.error) {
    return <Spinner>Loading....</Spinner>;
  }

  if (recipeStore.error) {
    return <div>An Error Ocurred while loading the data.</div>;
  }

  return (
    <div>
      {recipeList?.map((r) => (
        <RecipeItem recipe={r} key={r.uuid} />
      ))}
    </div>
  );
};

export default HomePage;
