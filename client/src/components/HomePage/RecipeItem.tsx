import React, { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { ROOT_URL } from "../../shared/constants";
import { IRecipe } from "../../types/RecipeType";
import "./RecipeStyle.css";

interface Props {
  recipe: IRecipe;
  fullview?: boolean;
}

const RecipeItem: React.FC<Props> = ({ recipe, fullview = false }) => {
  //fullview = view full (single) recipe;

  const {
    uuid,
    title,
    images,
    description,
    postDate,
    cookTime,
    servings,
    editDate
  } = recipe;

  const history = useHistory();

  // Split the dates to get the DATE [0] and TIME [1]
  const splitDate = postDate?.toString().split(" ");
  const splitEdit = editDate?.toString().split(" ");

  return (
    <div className={fullview ? "item-full-view": "item"} onClick={()=> history.push(`/view/${uuid}`)}>
      <div className="image-container">
        <a href={`${ROOT_URL}${images?.full}`} target="_blank" rel="noreferrer">
          <img
            src={`${ROOT_URL}${images?.small}`}
            alt={title}
            className="image-style"
          />
        </a>
      </div>
      <div className="description">
        <div className="title">
          <strong>{title}</strong>
        </div>
        <div>{description}</div>
        <div className="recipe-date">
          {!fullview && (<div><strong>Post on:</strong> {splitDate && splitDate[0]} <strong>at:</strong>{splitDate && splitDate[1]}</div>)}
        </div>
        <div className="cook-time">
          {!fullview && (
            <>
              <div className="item-cook-time"><strong>Cook time:</strong> {cookTime}</div>
              <div className="item-servings"><strong>Servings: </strong> {servings} Person</div>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
