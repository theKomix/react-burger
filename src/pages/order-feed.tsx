import React from "react";
import { useParams } from "react-router-dom";
import {
    BurgerIngredientDetails
} from "../components/burger-ingredients/burger-ingredient-details/burger-ingredient-details";
import {useAppSelector} from "../hooks";
import {selectIngredients} from "../services/app/app-slice";
import {NotFound404} from "./not-found";
import {OrderFeed} from "../components/order-feed/order-feed";
import {AllOrdersWsUrl} from "../services/api-urls";

export function OrderFeedPage() {
    // const {ingredientId} = useParams();
    // const ingredients = useAppSelector(selectIngredients);
    // const item = ingredients.find(i => i._id === ingredientId);

    return (
        <OrderFeed endPoint={AllOrdersWsUrl}/>
    );
}
