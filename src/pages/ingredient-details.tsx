import React from "react";
import { useParams } from "react-router-dom";
import {
    BurgerIngredientDetails
} from "../components/burger-ingredients/burger-ingredient-details/burger-ingredient-details";
import {useAppSelector} from "../hooks";
import {selectIngredients} from "../services/app/app-slice";
import {NotFound404} from "./not-found";

export function IngredientDetailsPage() {
    const {ingredientId} = useParams();
    const ingredients = useAppSelector(selectIngredients);
    const item = ingredients.find(i => i._id === ingredientId);

    return (
        <>
            {item ?
                <BurgerIngredientDetails item={item!}/>
                : <NotFound404/>
            }
        </>
    );
}
