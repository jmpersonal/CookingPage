import { createSlice } from "@reduxjs/toolkit";
import { getAllRecipes, getAllSpecials, getRecipe, editRecipe } from "../api/http";

const initialState = {
  currentRecipe: {
    current: null,
    loading: false,
    loaded: false,
    error: false,
  },
  recipes: {
    recipesList: null,
    loading: false,
    loaded: false,
    error: false,
  },
  specials: {
    specialsList: null,
    loading: false,
    loaded: false,
    error: false,
  },

  update_recipe: {
    loading: false,
    loaded: false,
    error: false,
  }
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    INIT_DATA: (state, action) => {
      state.recipes.recipesList = action.payload;
      state.recipes.loaded = true;
      state.recipes.loading = false;
      state.recipes.error = false;
    },
    INIT_DATA_LOADING: (state) => {
      state.recipes.loaded = false;
      state.recipes.loading = true;
      state.recipes.error = false;
    },
    INIT_DATA_ERROR: (state) => {
      state.recipes.loaded = false;
      state.recipes.loading = false;
      state.recipes.error = true;
    },

    UPDATE_RECIPE: (state) => {
      state.update_recipe.loaded = true;
      state.update_recipe.loading = false;
      state.update_recipe.error = false;
    },

    UPDATE_RECIPE_ERROR: (state) => {
      state.update_recipe.loaded = false;
      state.update_recipe.loading = false;
      state.update_recipe.error = true;
    },

    UPDATE_RECIPE_LOADING: (state) => {
      state.update_recipe.loaded = false;
      state.update_recipe.loading = true;
      state.update_recipe.error = false;
    },

    UPDATE_RESET: (state) => {
      state.update_recipe.loaded = false;
      state.update_recipe.loading = false;
      state.update_recipe.error = false;
    },

    RECIPE_RESET: (state) => {
      state.recipes.recipesList = null
      state.recipes.loaded = false;
      state.recipes.loading = false;
      state.recipes.error = false;
    },

    SPECIALS_DATA: (state, action) => {
      state.specials.specialsList = action.payload;
      state.specials.loaded = true;
      state.specials.loading = false;
      state.specials.error = false;
    },
    SPECIALS_DATA_LOADING: (state) => {
      state.specials.loaded = false;
      state.specials.loading = true;
      state.specials.error = false;
    },
    SPECIALS_DATA_ERROR: (state) => {
      state.specials.loaded = false;
      state.specials.loading = false;
      state.specials.error = true;
    },
    SPECIALS_RESET: (state) => {
      state.specials.loaded = false;
      state.specials.loading = false;
      state.specials.error = false;
      state.specials.specialsList = null;
    },


    CURRENT_RECIPE: (state, action) => {
      state.currentRecipe.current = action.payload;
      state.currentRecipe.loaded = true;
      state.currentRecipe.loading = false;
      state.currentRecipe.error = false;
    },
    CURRENT_RECIPE_LOADING: (state) => {
      state.currentRecipe.loaded = false;
      state.currentRecipe.loading = true;
      state.currentRecipe.error = false;
    },
    CURRENT_RECIPE_ERROR: (state) => {
      state.currentRecipe.loaded = false;
      state.currentRecipe.loading = false;
      state.currentRecipe.error = true;
    },
    CURRENT_RECIPE_RESET: (state) => {
      state.currentRecipe.loaded = false;
      state.currentRecipe.loading = false;
      state.currentRecipe.error = false;
      state.currentRecipe.current = null;
    },
  },
});

export const {
  INIT_DATA,
  INIT_DATA_LOADING,
  INIT_DATA_ERROR,
  UPDATE_RECIPE,
  UPDATE_RECIPE_ERROR,
  UPDATE_RECIPE_LOADING,
  RECIPE_RESET,
  UPDATE_RESET,
  SPECIALS_DATA,
  SPECIALS_DATA_LOADING,
  SPECIALS_DATA_ERROR,
  SPECIALS_RESET,
  CURRENT_RECIPE,
  CURRENT_RECIPE_LOADING,
  CURRENT_RECIPE_ERROR,
  CURRENT_RECIPE_RESET,
} = recipesSlice.actions;

export const initData = () => {
  return async (dispatch) => {
    dispatch(INIT_DATA_LOADING());
    try {
      const recipes = await getAllRecipes();
      dispatch(INIT_DATA(recipes));
    } catch (err) {
      return dispatch(INIT_DATA_ERROR());
    }
  };
};

export const initEditRecipe = (uuid, body) => {
  return async (dispatch) => {
    dispatch(UPDATE_RECIPE_LOADING());
    try {
      const recipes = await editRecipe(uuid, body);
      dispatch(UPDATE_RECIPE());
    } catch (err) {
      return dispatch(UPDATE_RECIPE_ERROR());
    }
  };
};

export const resetUpdate = () => {
  return async (dispatch) => {
    dispatch(UPDATE_RESET());
  }
}

export const resetAllRecipe = () => {
  return async (dispatch) => {
    dispatch(RECIPE_RESET());
  }
};

export const initSpecials = (uuids) => {
  return async (dispatch) => {
    dispatch(SPECIALS_DATA_LOADING());
    try {
      const recipes = await getAllSpecials(uuids);
      dispatch(SPECIALS_DATA(recipes));
    } catch (err) {
      return dispatch(SPECIALS_DATA_ERROR());
    }
  };
};

export const initCurrentRecipe = (uuids) => {
  return async (dispatch) => {
    dispatch(CURRENT_RECIPE_LOADING());


    try {
      const recipe = await getRecipe(uuids);
      dispatch(CURRENT_RECIPE(recipe));
    } catch (err) {
      return dispatch(CURRENT_RECIPE_ERROR());
    }
  };
};

export const resetRecipe = () => {
  return async (dispatch) => {
    dispatch(CURRENT_RECIPE_RESET());
  };
};

export const resetSpecials = () => {
  return async (dispatch) => {
    dispatch(SPECIALS_RESET());
  };
};

export default recipesSlice.reducer;
