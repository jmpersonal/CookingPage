# Install

Install the dependencies for both the client and the server.
1) `cd client`
	* `npm install`
	* to run the client use `npm start`
2) `cd server`
	* `npm install`
	* To start the server run `npm run start:api`

## Features

* Pull the data from the API (By default localhost:3001/)
* Create a list view which includes all the recipes
* Create a recipe detail view to display each recipe
* Ingredients with a matching ingredientId listed in the specials response should also show the special title, type and text under the ingredient name
* Update a view to add and update recipes and instructions. 
* Validates fields on editing fields.

## Usage
- The website shows a list of recipes. Click on any of them to view  a detailed view of the recipe.
- If the ingredient has some kind of special, it'll show it below the name of the ingredient.
- You can edit the recipe by clicking 'Edit Recipe'