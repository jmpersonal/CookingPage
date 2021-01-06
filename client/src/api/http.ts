import { IRecipe } from "../types/RecipeType";
import axios from 'axios'
const ROOT_URL = "http://localhost:3001/";

// Recipes Requests
export const getAllRecipes = async (page: number = 1, limit: number = 5) => {
  let recipesDir = `recipes?_sort=postDate&_order=desc&_page=${page}&_limit=${limit}`;
  const res = await axios.get(`${ROOT_URL}${recipesDir}`);
  let data = await res.data;
  return data;
};

export const postRecipe = async (body: object) => {
  let recipeDir = "recipes";
  const res = await axios.post(`${ROOT_URL}${recipeDir}`);
  let data = await res.data;
  return data;
}

export const getRecipe = async (uuid: string) => {
  let recipeDir = "recipes?uuid=";
  const res = await axios.get(`${ROOT_URL}${recipeDir}${uuid}`);
  let data = await res.data;
  return data;
}

export const editRecipe = async (uuid: string, body: object) => {
  let recipeDir = "recipes/";
  console.log(body);
  
  const res = await axios.patch(`${ROOT_URL}${recipeDir}${uuid}`, body, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let data = await res.data;
  console.log(data);
  
  return data;
}


//Specials Requests

export const getAllSpecials = async (uuids: string) => {
  let specialsDir = "specials?";
  const res = await axios.get(`${ROOT_URL}${specialsDir}${uuids}`);
  let data = await res.data;
  return data;
}




