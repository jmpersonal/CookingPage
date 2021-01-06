import React, { Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { getAllSpecials } from "../../api/http";
import { capitalizeFirstLetter } from "../../shared/functions";
import { IRecipe } from "../../types/RecipeType";
import { ISpecials } from "../../types/SpecialsType";

import "./ViewStyle.css";

interface Props {
  recipe: IRecipe;
  fullview?: boolean;
  specials?: ISpecials[];
  specialError?: boolean;
}

const ViewRecipeBody: React.FC<Props> = ({ recipe, specials, specialError = false }) => {
  const { ingredients, directions } = recipe;
  let { path, url } = useRouteMatch();

  const splitDate = recipe.postDate?.toString().split(" ");
  const splitEdit = recipe.editDate?.toString().split(" ");

  const injectSpecial = (uuid: string) => {
    // Do a find to get the ingredientId passdown from the parent component.
    // If it finds it, itll inject it in the JSX.

    const getSpecial = specials?.find((s) => s.ingredientId === uuid);

    // Since geo is a string, split it to get the LAT and LNG.
    const geo = getSpecial?.geo && getSpecial?.geo.split(",");
    const linkToMaps = geo
      && `https://www.google.com/maps/dir/${geo[0]},${geo[1]}`

    if (getSpecial) {
      return geo ? (
        <a href={linkToMaps} target="_blank" rel="noreferrer">{renderSpecial(getSpecial)}</a>
      ) : (renderSpecial(getSpecial))
    }
  };

  const renderSpecial = (getSpecial: ISpecials) => {
    const promocode = getSpecial?.code ? <div className="item-special-inline" style={{color: "tomato"}}>{getSpecial.code}</div> : null;

    return (
      <div className="item-special">
        <div className="item-special-inline" style={{color: "tomato", fontWeight: 'bold'}}>
          {capitalizeFirstLetter(getSpecial.type)}:
        </div>
        <div className="item-special-inline">{getSpecial.title}</div>
        {promocode}
        <div className="item-special-inline">{getSpecial.text}</div>
      </div>
    );
  }

  return (
    <div className="view-body">
      <div className="view-actions">
        <div><Link to={`/edit/${recipe.uuid}`}>Edit</Link></div>
      </div>
      {specialError && (<div className="item-special" style={{backgroundColor: 'tomato'}}>Error loading coupons. Come back later to get yours!</div>)}
      <div className="recipe-information">
        <div><strong>Cook time: </strong>{recipe?.cookTime}</div>
        <div><strong>Servings: </strong>{recipe?.servings} person</div>
      </div>
      <div className="ingredients-list">
        <div className="instruction-title">Ingredients</div>
        <ul>
          {ingredients &&
            ingredients.map((i) => (
              <Fragment key={`${i.uuid}${i.name}`}>
                <li className="ingredient-indent">
                  <div className="item-name">
                    {i.amount} {`${i.measurement && `${i.measurement} of `}`}
                    {capitalizeFirstLetter(i.name)}
                  </div>

                  {injectSpecial(i.uuid)}
                </li>
              </Fragment>
            ))}
        </ul>
      </div>

      <div className="instructions-list">
        <div className="instruction-title">How to make {recipe?.title}</div>
        <ol>
          {directions &&
            directions.map((d) => (
              <li key={d.instructions}>
                {d.optional && "(Optional) "}
                {d.instructions}
              </li>
            ))}
        </ol>
      </div>
      <div>
        <strong>Published on:</strong> {splitDate && splitDate[0]} {" "}
        <strong>Updated on:</strong> {splitDate && splitEdit[0]}
      </div>
    </div>
  );
};

export default ViewRecipeBody;
