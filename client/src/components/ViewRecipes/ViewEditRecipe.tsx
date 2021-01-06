import React, { useEffect, useState } from 'react'
import Input from '../../shared/Input/Input';
import RecipeItem from '../HomePage/RecipeItem';
import Button from '../../shared/Button/Button';
import { IRecipe } from "../../types/RecipeType";
import {IStore} from '../../types/StoreInterface';
import { initEditRecipe, resetAllRecipe, resetUpdate } from '../../app/recipeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from "react-hook-form";

import "./ViewStyle.css";

interface Props {
  recipe: IRecipe;
}

const EditRecipe: React.FC<Props> = ({ recipe }) => {
  const store = useSelector((state: {recipesStore: IStore})=> state.recipesStore);
  const dispatch = useDispatch();
  const { register, handleSubmit, control, errors } = useForm({defaultValues: recipe});

  const { fields: ingredientsField, append: ingredientsAppend, remove: removeIngredient, append: appendIngredient } = useFieldArray({control, name: "ingredients"})
  const { fields: directionsField, append: directionsAppend, remove: removeDirection, append: appendDirection } = useFieldArray({control, name: "directions"})

  useEffect(() => {
    return () => {
      dispatch(resetAllRecipe()); // Reset the recipe store to reload the new data.
      dispatch(resetUpdate()); // Reset the update statuses.
    }
  }, [])

  useEffect(()=>{
    console.log(errors.directions);
  }, [errors])

  const onSubmit = (data: any) => {
    
    let id = recipe.uuid
    // dispatch(initEditRecipe(id, data))
  }

  
  return (
    <>
    <RecipeItem recipe={recipe} fullview={true} />
    <div className="view-body">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Basic List:</h4>
        <Input label={"Recipe Name"} name={"title"} ref={register()}/>
        <Input label={"Description"} name={"description"} style={{width: '300px'}} ref={register()}/>
        <Input label={"Preparation Time"} name={"prepTime"} ref={register()}/>
        <Input label={"Cook Time"} name={"cookTime"} ref={register()}/>
        <h4>Ingredients List:</h4>
        {ingredientsField.map((i, idx)=>{
          let _idx = idx + 1
          return (
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}} key={i.uuid}>
              <Input defaultValue={i.uuid} name={`ingredients[${idx}].uuid`} ref={register()} type="hidden"/>
              <Input defaultValue={i.name} label={`Ingredient ${_idx}`} name={`ingredients[${idx}].name`} ref={register({required: true})}/>
              <Input defaultValue={i.measurement} label={`Measurement`} name={`ingredients[${idx}].measurement`} ref={register()} style={{width: '70px'}}/>
              <Input defaultValue={i.amount} label={`Amount`} name={`ingredients[${idx}].amount`} ref={register()} style={{width: '30px'}}/>
              <Button onClick={()=> removeIngredient(idx)} text="Remove">remove</Button>
            </div>
          )
        })}
        <Button onClick={()=> appendIngredient({name: "", measurement: "", amount: ""})} text="Add Ingredient"/ >
        <h4>Directions List:</h4>
        {directionsField.map((d, idx)=>{
          let _idx = idx + 1;
          return (
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', gap: 20}} key={d.instructions}>
              <Input defaultValue={d.instructions} label={`Direction ${_idx}`} name={`directions[${idx}].instructions`} ref={register({required: true})}/>
              <Input label={`Optional`} name={`directions[${idx}].optional`} type={"checkbox"} checked={d.optional} ref={register()} style={{margin: '0 auto'}}/>
                <Button onClick={()=> removeDirection(idx)} text="remove">remove</Button>
            </div>
          )
        })}
        <Button onClick={()=> appendDirection({instructions: "", optional: false})} text="Add Direction" />
        {store.update_recipe.loading && <div style={{backgroundColor: 'thistle', padding: '5px'}}>Loading...</div>}
        {store.update_recipe.loaded && <div style={{backgroundColor: 'yellowgreen', padding: '5px'}}>Saved</div>}
        {store.update_recipe.error && <div style={{backgroundColor: 'tomato', padding: '5px'}}>An Error Occured</div>}
        <div>
        {errors && errors?.ingredients?.map(i=>{
          if(i && i.name?.type === 'required'){
            return <div className="warning">Ingredient Field can not be empty</div>
          }
        })}
        </div>
        <div>
        {errors && errors?.directions?.map(i=>{
          if(i && i.instructions?.type === 'required'){
            return <div className="warning">Direction Field can not be empty</div>
          }
        })}
        </div>
        <button>Submit?</button>
      </form>
    </div>
    </>
  )
}

export default EditRecipe
